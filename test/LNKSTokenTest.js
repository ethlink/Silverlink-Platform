const expectThrow = require('./utils').expectThrow
const LNKSToken = artifacts.require("./LNKSToken.sol")
let LNKS

// Test suite
contract('LNKSToken', function(accounts) {
  beforeEach(async () => {
    LNKS = await LNKSToken.new();
    LNKS.mint(accounts[0], 10000);

    const balance = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance.toNumber(), 10000)
  })

  it("should have 10000 tokens", async () => {
    const supply = await LNKS.totalSupply.call()
    assert.strictEqual(supply.toNumber(), 10000)
  })

  it('creation: test correct setting of vanity information', async () => {
    const name = await LNKS.name.call()
    assert.strictEqual(name, 'Link Platform')

    const decimals = await LNKS.decimals.call()
    assert.strictEqual(decimals.toNumber(), 3)

    const symbol = await LNKS.symbol.call()
    assert.strictEqual(symbol, 'LNKS')
  })

  // TRANSFERS
  // normal transfers without approvals
  it('transfers: ether transfer should be reversed.', async () => {
    const balanceBefore = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balanceBefore.toNumber(), 10000)

    web3.eth.sendTransaction({from: accounts[0], to: LNKS.address, value: web3.toWei('10', 'Ether')}, async (err, res) => {
      expectThrow(new Promise((resolve, reject) => {
        if (err) reject(err)
        resolve(res)
      }))

      const balanceAfter = await LNKS.balanceOf.call(accounts[0])
      assert.strictEqual(balanceAfter.toNumber(), 10000)
    })
  })

  it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', async () => {
    let trans = await LNKS.transfer(accounts[1], 10000, {from: accounts[0]})
    const balance = await LNKS.balanceOf.call(accounts[1])
    const balance2 = await LNKS.balanceOf.call(accounts[0])

    assert.strictEqual(balance.toNumber(), 10000)
  })

  it('transfers: should fail when trying to transfer 10001 to accounts[1] with accounts[0] having 10000', () => {
    return expectThrow(LNKS.transfer.call(accounts[1], 10001, {from: accounts[0]}))
  })

  it('transfers: should handle zero-transfers normally', async () => {
    let transfer = await LNKS.transfer.call(accounts[1], 0, {from: accounts[0]});

    assert(transfer, 'zero-transfer has failed')
  })

  // APPROVALS
  it('approvals: msg.sender should approve 100 to accounts[1]', async () => {
    await LNKS.approve(accounts[1], 100, {from: accounts[0]})
    const allowance = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance.toNumber(), 100)
  })

  // bit overkill. But is for testing a bug
  it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', async () => {
    const balance0 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance0.toNumber(), 10000)

    await LNKS.approve(accounts[1], 100, {from: accounts[0]}) // 100
    const balance2 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct')

    await LNKS.transferFrom.call(accounts[0], accounts[2], 20, {from: accounts[1]})
    await LNKS.allowance.call(accounts[0], accounts[1])
    await LNKS.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]}) // -20
    const allowance01 = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance01.toNumber(), 80) // =80

    const balance22 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance22.toNumber(), 20)

    const balance02 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance02.toNumber(), 9980)
  })

  // should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
  it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', async () => {
    await LNKS.approve(accounts[1], 100, {from: accounts[0]})
    const allowance01 = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance01.toNumber(), 100)

    await LNKS.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]})
    const allowance012 = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance012.toNumber(), 80)

    const balance2 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance2.toNumber(), 20)

    const balance0 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance0.toNumber(), 9980)

    // FIRST tx done.
    // onto next.
    await LNKS.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]})
    const allowance013 = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance013.toNumber(), 60)

    const balance22 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance22.toNumber(), 40)

    const balance02 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance02.toNumber(), 9960)
  })

  // should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
  it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', async () => {
    await LNKS.approve(accounts[1], 100, {from: accounts[0]})
    const allowance01 = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance01.toNumber(), 100)

    await LNKS.transferFrom(accounts[0], accounts[2], 50, {from: accounts[1]})
    const allowance012 = await LNKS.allowance.call(accounts[0], accounts[1])
    assert.strictEqual(allowance012.toNumber(), 50)

    const balance2 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance2.toNumber(), 50)

    const balance0 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance0.toNumber(), 9950)

    // FIRST tx done.
    // onto next.
    expectThrow(LNKS.transferFrom.call(accounts[0], accounts[2], 60, {from: accounts[1]}))
  })

  it('approvals: attempt withdrawal from account with no allowance (should fail)', () => {
    return expectThrow(LNKS.transferFrom.call(accounts[0], accounts[2], 60, {from: accounts[1]}))
  })

  it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', async () => {
    await LNKS.approve(accounts[1], 100, {from: accounts[0]})
    await LNKS.transferFrom(accounts[0], accounts[2], 60, {from: accounts[1]})
    await LNKS.approve(accounts[1], 0, {from: accounts[0]})
    expectThrow(LNKS.transferFrom.call(accounts[0], accounts[2], 10, {from: accounts[1]}))
  })

  it('approvals: approve max (2^256 - 1)', async () => {
    await LNKS.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', {from: accounts[0]})
    const allowance = await LNKS.allowance(accounts[0], accounts[1])
    assert(allowance.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77'))
  })

  // should approve max of msg.sender & withdraw 20 without changing allowance (should succeed).
  it('approvals: msg.sender approves accounts[1] of max (2^256 - 1) & withdraws 20', async () => {
    const balance0 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance0.toNumber(), 10000)

    const max = '1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77'
    await LNKS.approve(accounts[1], max, {from: accounts[0]})
    const balance2 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct')

    await LNKS.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]})

    const balance22 = await LNKS.balanceOf.call(accounts[2])
    assert.strictEqual(balance22.toNumber(), 20)

    const balance02 = await LNKS.balanceOf.call(accounts[0])
    assert.strictEqual(balance02.toNumber(), 9980)
  })

  it('events: should fire Transfer event properly', async () => {
    const res = await LNKS.transfer(accounts[1], '2666', {from: accounts[0]})
    const transferLog = res.logs.find(element => element.event.match('Transfer'))
    assert.strictEqual(transferLog.args._from, accounts[0])
    assert.strictEqual(transferLog.args._to, accounts[1])
    assert.strictEqual(transferLog.args._value.toString(), '2666')
  })

  it('events: should fire Transfer event normally on a zero transfer', async () => {
    const res = await LNKS.transfer(accounts[1], '0', {from: accounts[0]})
    const transferLog = res.logs.find(element => element.event.match('Transfer'))
    assert.strictEqual(transferLog.args._from, accounts[0])
    assert.strictEqual(transferLog.args._to, accounts[1])
    assert.strictEqual(transferLog.args._value.toString(), '0')
  })

  it('events: should fire Approval event properly', async () => {
    const res = await LNKS.approve(accounts[1], '2666', {from: accounts[0]})
    const approvalLog = res.logs.find(element => element.event.match('Approval'))
    assert.strictEqual(approvalLog.args._owner, accounts[0])
    assert.strictEqual(approvalLog.args._spender, accounts[1])
    assert.strictEqual(approvalLog.args._value.toString(), '2666')
  })
});
