const Web3 = require('web3');
const contract = require('truffle-contract');
const moment = require('moment');
const fs = require('fs');

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
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    let contractInstance = contract(artifact);
    contractInstance.setProvider(this.web3.currentProvider);

    if (typeof contractInstance.currentProvider.sendAsync !== "function") {
      contractInstance.currentProvider.sendAsync = function() {
        return contractInstance.currentProvider.send.apply(
          contractInstance.currentProvider, arguments
        );
      };
    }

    this.account = await this.web3.eth.getAccounts();
    this.account = this.account[0];

    this.app = await contractInstance.deployed();

    await this.web3.eth.personal.unlockAccount(this.account, 'lnkstoken1!', 600);

    cb();
  }

  async fetchRequest(type) {
    let len = type === 'order' ? await this.app.getOrdersLength() : await this.app.getRedemptionsLength();
    len = len.toNumber();

    for (let i = 0; i < len; i++) {
      let request = type === 'order' ? await this.app.getOrder.call(i) : await this.app.getRedemption.call(i),
        createdOn = request[2].toNumber(),
        deadline = createdOn + 3*24*60*60,
        now = Math.floor(Date.now() / 1000);

      if (now > deadline) {
        console.log(request[0], request[1], request[2]);

        if (type === 'order') {
          await this.app.declineOrder(i, { from: this.account });
          this.fetchRequest('order');
        } else {
          await this.app.declineRedemption(i, { from: this.account })
          this.fetchRequest('redemption');
        };

        break;
      }
    }
  }
}

fs.readFile('LNKSExchange.json', 'utf8', (err,data) => {
  if (err) return console.log(err);
  const app = new App(JSON.parse(data));
});
