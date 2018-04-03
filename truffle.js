var HDWalletProvider = require("truffle-hdwallet-provider");
var keys = require('./keys');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: '0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0',
      gas: 4612388
    },
    rinkeby: {
    	// host: "localhost",
    	// port: 8545,
      provider: new HDWalletProvider(
          keys.mnemonic,
          'https://rinkeby.infura.io/7Vjiw3k5GuN1jSfQ0Za0'
      ),
    	network_id: 4,
      //from: '0xd8770af9507f43ee5422b7ecd83a2a8e04fdd969'
    }
  }
};
