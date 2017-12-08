const expectThrow = require('./utils').expectThrow
const LNKSToken = artifacts.require("./LNKSToken.sol");
const LNKSExchange = artifacts.require("./LNKSExchange.sol");
let token;
let exchange;

// THINGS TO TEST:
// 1. Approve order
// 2. Redeem order (supply and balance change)
// 3. Redeem and approve from other accounts
// 4. BuyDirect fee 

// Test suite
contract('LNKSToken', function(accounts) {
  beforeEach(async () => {
    token = await LNKSToken.new()
    exchange = await LNKSExchange.new(token.address)

    await token.addOwner(exchange.address)

    // 
    // token.mint(accounts[1], 10000)
  })

  it("should buy direct 0.01 ETH worth of tokens", async () => {
  	const value = 0.01
  	const valueWei = parseInt(web3.toWei(value, 'ether'))
  	const exchangeRate = 10000

  	await exchange.buyDirect({
  		from: accounts[0],
  		value: valueWei
  	})

   	let ordersLength = await exchange.getOrdersLength.call()
  	assert.strictEqual(ordersLength.toNumber(), 1, 'number of orders should be 1')

  	let order = await exchange.getOrder(0)

  	assert.strictEqual(order[0], accounts[0])
  	assert.strictEqual(order[1].toNumber(), valueWei)

  	await exchange.approveOrder(0, parseInt(value * exchangeRate))

  	let balance = await token.balanceOf.call(accounts[0])
 	assert.strictEqual(balance.toNumber(), parseInt(value * exchangeRate))

  	ordersLength = await exchange.getOrdersLength.call()
  	assert.strictEqual(ordersLength.toNumber(), 0, 'number of orders should be 1')
  })

  it("should buy direct 0.01 ETH worth of tokens", async () => {
  	const value = 10000

  	token.mint(accounts[0], value)

  	await exchange.redeem(value)

   	let redemptionsLength = await exchange.getRedemptionsLength.call()
  	assert.strictEqual(redemptionsLength.toNumber(), 1, 'number of redemptions should be 1')

  	let redemption = await exchange.getRedemption.call(0)
   	assert.strictEqual(redemption[0], accounts[0], 'account should be accounts[0]')
   	assert.strictEqual(redemption[1].toNumber(), value, 'tokens amount should be 10000')

  	//await exchange.approveRedemption(0)

  	//let balance = await token.balanceOf.call(accounts[0])
 	//assert.strictEqual(balance.toNumber(), 0)

  	//redemptionsLength = await exchange.getRedemptionsLength.call()
  	//assert.strictEqual(redemptionsLength.toNumber(), 0, 'number of orders should be 1')
  })
});