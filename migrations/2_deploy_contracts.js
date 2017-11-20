var SafeMathLib = artifacts.require("./SafeMath.sol");
var LNKSExchange = artifacts.require("./LNKSExchange.sol");
var LNKSToken = artifacts.require("./LNKSToken.sol");
var OwnableMultiple = artifacts.require("./OwnableMultiple.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMathLib);
  deployer.link(SafeMathLib, LNKSToken);
  deployer.deploy(LNKSToken);
  deployer.deploy(LNKSExchange);
  deployer.deploy(OwnableMultiple);
};
