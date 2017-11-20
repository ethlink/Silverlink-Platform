# LNKS

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