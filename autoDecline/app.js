const Web3 = require('web3');
const contract = require('truffle-contract');
const fs = require('fs');
const keys = require('keys');

class App {
  constructor(artifact) {
    this.app = null;
    this.account = null;
    this.web3 = null;

    this.initiateApp(artifact, () => {
      this.fetchRequest('order');
      this.fetchRequest('redemption');
    });
  }

  async initiateApp(artifact, cb) {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    const contractInstance = contract(artifact);
    contractInstance.setProvider(this.web3.currentProvider);

    if (typeof contractInstance.currentProvider.sendAsync !== 'function') {
      contractInstance.currentProvider.sendAsync = function () {
        return contractInstance.currentProvider.send.apply(contractInstance.currentProvider, arguments );
      };
    }

    this.account = await this.web3.eth.getAccounts();
    this.account = this.account[0];

    this.app = await contractInstance.deployed();

    await this.web3.eth.personal.unlockAccount(this.account, keys.accountPass, 600);

    cb();
  }

  async fetchRequest(type) {
    let len = type === 'order' ? await this.app.getOrdersLength() : await this.app.getRedemptionsLength();
    len = len.toNumber();

    for (let i = 0; i < len; i += 1) {
      const request = type === 'order' ? await this.app.getOrder.call(i) : await this.app.getRedemption.call(i);
      const createdOn = request[2].toNumber();
      const deadline = createdOn + 3 * 24 * 60 * 60;
      const now = Math.floor(Date.now() / 1000);

      if (now > deadline) {
        if (type === 'order') {
          await this.app.declineOrder(i, { from: this.account });
          this.fetchRequest('order');
        } else {
          await this.app.declineRedemption(i, { from: this.account });
          this.fetchRequest('redemption');
        }

        break;
      }
    }
  }
}

fs.readFile('LNKSExchange.json', 'utf8', (err, data) => {
  if (err) return console.log(err);
  new App(JSON.parse(data));
});
