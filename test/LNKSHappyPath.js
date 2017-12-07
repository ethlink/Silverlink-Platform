// Contract to be tested
var LNKSToken = artifacts.require("./LNKSToken.sol");

// Test suite
contract('LNKSToken', function(accounts) {
  var LNKSTokenInstance;
  var owner = accounts[0];
  var user = accounts[1];

  it("should have 0 tokens", function() {
    return LNKSToken.deployed().then(function(instance) {
      LNKSTokenInstance = instance;
      return instance.totalSupply();
    }).then(function(data) {
      assert.equal(data, 0, "token supply should be 0");
    });
  });

  it("should have 1200 tokens supply and owner should have 1200 in balance", () => {
    return LNKSToken.deployed().then(instance => {
      LNKSTokenInstance = instance;
      return instance.mint(owner,1200);
    }).then(() => {
      return LNKSTokenInstance.totalSupply();
    }).then(data => {
      assert.equal(data, 1200, "token supply should be 1200");
    }).then(() => {
      return LNKSTokenInstance.balanceOf(owner);
    }).then((data) => {
      assert.equal(data, 1200, "owner should have 1200 tokens");
    });
  });
});
