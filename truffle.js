module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: '0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0'
    },
    rinkeby: {
    	host: "localhost",
    	port: 8545,
    	network_id: 4
    }
  }
};
