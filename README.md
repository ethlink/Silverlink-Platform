# LNKS

# Test dApp

1. Run `./smarttestrpc.sh`
2. Import 3 created accounts to Metamask via private key
3. Open `truffle console`
4. Run `LNKSToken.deployed().then(function(instance) {token=instance;})`
5. Mint some tokens `token.mint(web3.eth.accounts[0],100)`
6. From new terminal window go to `/frontend` folder and run `npm start`.
7. If you have Metamask enabled, you will see account address and its balance


# Test token

1. LNKSToken.deployed().then(function(instance) {token=instance;})
2. LNKSExchange.deployed().then(function(instance) {exchange=instance;})
3. token.mint(web3.eth.accounts[0],100)
4. token.address
5. exchange.setTokenAddress(‘<TOKEN_ADDRESS>’)
6. exchange.buyDirect({from: web3.eth.accounts[1], value: web3.toWei(7.77, 'ether')})
7. exchange.getOrdersLength.call()
8. exchange.getOrder.call(0)
9. Assume 1 ETH = 100 TOKENS (7.77 ETH = 777 TOKENS)
10. token.addOwner(exchange.address)
11. exchange.approveOrder(0, 777)
12. token.balanceOf(web3.eth.accounts[1])


# Deployment on Rinkeby

`truffle migrate --network rinkeby --reset`

# Contracts

- LNKSToken - https://rinkeby.etherscan.io/address/0x469e2b2f034636d1af70a7d05e57461482bd9204
- LNKSExchange - https://rinkeby.etherscan.io/address/0x342b7b4aa230aa1dd669ae3b3b1b1987e92df1bd
