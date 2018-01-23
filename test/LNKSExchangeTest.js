const expectThrow = require('./utils').expectThrow
const LNKSToken = artifacts.require("./LNKSToken.sol");
const LNKSExchange = artifacts.require("./LNKSExchange.sol");
let token;
let exchange;

// TODO: test declineOrder and declineRedemption

// Test suite
contract('LNKSToken', function(accounts) {
  beforeEach(async () => {
    token = await LNKSToken.new()
    exchange = await LNKSExchange.new(token.address)

    await token.addOwner(exchange.address)
    await token.addOwner(accounts[0])
  })

  it("should buy direct 1 ETH worth of tokens", async () => {
  	const value = 1
  	const valueWei = parseInt(web3.toWei(value, 'ether'))
  	const exchangeRate = 100000
    const tokensAmount = parseInt(value * exchangeRate)
    const feeAmount = tokensAmount * 0.003

  	await exchange.buyDirect({
  		from: accounts[0],
  		value: valueWei
  	})

   	let ordersLength = await exchange.getOrdersLength.call()
  	assert.strictEqual(ordersLength.toNumber(), 1, 'number of orders should be 1')

  	let order = await exchange.getOrder(0)

  	assert.strictEqual(order[0], accounts[0])
  	assert.strictEqual(order[1].toNumber(), valueWei)

  	await exchange.approveOrder(0, tokensAmount)

  	let balance = await token.balanceOf.call(accounts[0])
 	  assert.strictEqual(balance.toNumber(), tokensAmount - feeAmount)

    let balanceEth = await web3.eth.getBalance(exchange.address)
 	  assert.strictEqual(balanceEth.toNumber(), valueWei, `exchange eth balance should be ${value}`)

    balance = await token.balanceOf.call(exchange.address)
 	  assert.strictEqual(balance.toNumber(), feeAmount, `exchange token balance should be ${feeAmount}`)

  	ordersLength = await exchange.getOrdersLength.call()
  	assert.strictEqual(ordersLength.toNumber(), 0, 'number of orders should be 1')

    // second order, this time should not deduct fee
    await exchange.buyDirect({
  		from: accounts[0],
  		value: valueWei
  	})

  	await exchange.approveOrder(0, tokensAmount)

  	balance = await token.balanceOf.call(accounts[0])
 	  assert.strictEqual(balance.toNumber(), tokensAmount*2 - feeAmount)

    balanceEth = await web3.eth.getBalance(exchange.address)
 	  assert.strictEqual(balanceEth.toNumber(), valueWei*2, `exchange eth balance should be ${value}`)

    balance = await token.balanceOf.call(exchange.address)
 	  assert.strictEqual(balance.toNumber(), feeAmount, `exchange token balance should be ${feeAmount}`)
  })

  it("should buy direct 0.0001 ETH worth of tokens", async () => {
  	const value = 0.0001
  	const valueWei = parseInt(web3.toWei(value, 'ether'))
  	const exchangeRate = 10000
    const tokensAmount = parseInt(value * exchangeRate)
    const feeAmount = 1

  	await exchange.buyDirect({
  		from: accounts[0],
  		value: valueWei
  	})

  	await exchange.approveOrder(0, tokensAmount)

  	let balance = await token.balanceOf.call(accounts[0])
 	  assert.strictEqual(balance.toNumber(), tokensAmount - feeAmount)

    balance = await token.balanceOf.call(exchange.address)
 	  assert.strictEqual(balance.toNumber(), feeAmount, `exchange token balance should be ${feeAmount}`)
  })

  it("should buy direct 0.01 ETH worth of tokens", async () => {
  	const value = 10000

  	token.mint(accounts[0], value)

    let balance = await token.balanceOf.call(accounts[0])
    assert.strictEqual(balance.toNumber(), value)

  	await exchange.redeem(value, 'Random street', {from: accounts[0]})

   	let redemptionsLength = await exchange.getRedemptionsLength.call()
  	assert.strictEqual(redemptionsLength.toNumber(), 1, 'number of redemptions should be 1')

    balance = await token.balanceOf.call(accounts[0])
 	  assert.strictEqual(balance.toNumber(), 0, 'balance should be 0')

    balance = await token.balanceOf.call(exchange.address)
 	  assert.strictEqual(balance.toNumber(), 10000, 'balance should be 10000')

  	let redemption = await exchange.getRedemption.call(0)
   	assert.strictEqual(redemption[0], accounts[0], 'account should be accounts[0]')
   	assert.strictEqual(redemption[1].toNumber(), value, 'tokens amount should be 10000')

  	await exchange.approveRedemption(0);

    balance = await token.balanceOf.call(exchange.address)
 	  assert.strictEqual(balance.toNumber(), 0, 'balance should be 0')

  	redemptionsLength = await exchange.getRedemptionsLength.call()
  	assert.strictEqual(redemptionsLength.toNumber(), 0, 'number of orders should be 1')
  })

  it('should fail to approve order from non-owner acc', async () => {
    const value = 0.01
  	const valueWei = parseInt(web3.toWei(value, 'ether'))
  	const exchangeRate = 10000

  	await exchange.buyDirect({
  		from: accounts[0],
  		value: valueWei
  	})

  	return expectThrow(exchange.approveOrder(0, parseInt(value * exchangeRate), {
      from: accounts[2]
    }));
  });

  it('should fail to approve redeem from non-owner acc', async () => {
    const value = 10000

  	token.mint(accounts[0], value)
  	await exchange.redeem(value, 'Random address', {from: accounts[0]})

    return expectThrow(exchange.approveRedemption(0, {
      from: accounts[2]
    }));
  });

  it("should not let buy 0 tokens", async () => {
    return expectThrow(exchange.buyDirect({
      from: accounts[0],
      value: 0
    }));
  });

  it("should have 1 ETH balance and then withdraw 0.5 ETH", async () => {
    const value = 1
  	const valueWeiDeposit = parseInt(web3.toWei(value, 'ether'))
    const valueWeiWithdraw = parseInt(web3.toWei(value/2, 'ether'))

    await exchange.buyDirect({
      from: accounts[0],
      value: valueWeiDeposit
    });

    let balanceOwnerEthBefore = await web3.eth.getBalance(accounts[0])
    let balanceExchangeEthBefore = await web3.eth.getBalance(exchange.address)
 	  assert.strictEqual(balanceExchangeEthBefore.toNumber(), valueWeiDeposit, `exchange ETH balance should be ${valueWeiDeposit}`)

    await exchange.withdraw(accounts[0], valueWeiWithdraw)

    let balanceOwnerEthAfter = await web3.eth.getBalance(accounts[0])
    let balanceExchangeEthAfter = await web3.eth.getBalance(exchange.address)
    assert(balanceOwnerEthAfter.toNumber()-(balanceOwnerEthAfter.toNumber() + valueWeiWithdraw) < 0.1, `owner ETH balance should be ${valueWeiWithdraw}`)
    assert.strictEqual(balanceExchangeEthAfter.toNumber(), valueWeiDeposit - valueWeiWithdraw, `exchange ETH balance should be ${value}`)
  });

  it("should not let withdraw for non-owners", async () => {
    await exchange.buyDirect({from: accounts[0], value: 500000000});
    return expectThrow(exchange.withdraw(accounts[1], 5000, {from: accounts[2]}));
  });
});


/*
1. LNKSToken.deployed().then(function(instance) {token=instance;})
2. LNKSExchange.deployed().then(function(instance) {exchange=instance;})
3. token.mint(web3.eth.accounts[0],100)
4. exchange.setTokenAddress(token.address)
5. exchange.redeem(5)
6. exchange.approveRedemption(0)
 */
