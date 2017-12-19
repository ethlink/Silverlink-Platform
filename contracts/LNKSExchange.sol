pragma solidity ^0.4.8;

import "./SafeMath.sol";
import './OwnableMultiple.sol';
import './LNKSToken.sol';


contract LNKSExchange is OwnableMultiple {
  using SafeMath for uint;

  struct Order {
    address buyer;
    uint amount;
  }

  struct Redemption {
    address redeemer;
    uint amount;
  }

  LNKSToken public token;
  uint public fee;
  mapping(address => bool) usedAddresses;
  Order[] orders;
  Redemption[] redemptions;

  function LNKSExchange(address _tokenAddress) {
    token = LNKSToken(_tokenAddress);
    fee = 3; // 3 = 0.3% in 1-digit precision
  }

  function setTokenAddress(address _tokenAddress) public onlyOwner {
    token = LNKSToken(_tokenAddress);
  }

  event BuyDirectEvent(address _buyer, uint _amount, uint _timestamp);
  event RedeemEvent(address _redeember, uint _amount, uint _timestamp);

  function buyDirect() public payable {
    require(msg.value > 0);

    Order memory order = Order({
      buyer: msg.sender,
      amount: msg.value
    });

    orders.push(order);

    BuyDirectEvent(order.buyer, order.amount, block.timestamp);
  }

  function getOrder(uint _index) public constant onlyOwner returns (address, uint) {
    Order memory order = orders[_index];
    return (order.buyer, order.amount);
  }

  function approveOrder(uint _index, uint _tokensAmount) public onlyOwner {
    require(orders[_index].amount >= 0);

    Order memory order = orders[_index];

    // Deduct fee if address is never used
    if (usedAddresses[order.buyer] == false) {
      uint feeAmount = calculateFee(_tokensAmount);
      _tokensAmount = _tokensAmount.sub(feeAmount);
      token.mint(this, feeAmount);
      usedAddresses[order.buyer] = true;
    }

    // mint tokens for the buyer
    token.mint(order.buyer, _tokensAmount);

    // remove order from orders array
    orders[_index] = orders[orders.length-1];
    orders.length--;
  }

  function declineOrder(uint _index) public onlyOwner {
    require(orders[_index].amount >= 0);

    Order memory order = orders[_index];

    order.buyer.transfer(order.amount);

    // remove order from orders array
    orders[_index] = orders[orders.length-1];
    orders.length--;
  }

  function setNewFee(uint _fee) public onlyOwner {
    fee = _fee;
  }

  function calculateFee(uint _amount) public returns (uint) {
    uint feeAmount = _amount * fee / 1000;

    if (feeAmount == 0) return 1;
    else return feeAmount;
  }

  function getOrdersLength() public constant onlyOwner returns (uint) {
    return orders.length;
  }

  function redeem(uint _value) public returns (uint) {
    require(token.balanceOf(msg.sender) >= _value);

    // Approve tokens transfer from sender to exchange vault
    token.approveFrom(msg.sender, this, _value);
    token.transferFrom(msg.sender, this, _value);

    // Take note of executed redemption
    Redemption memory redemption = Redemption({
      redeemer: msg.sender,
      amount: _value
    });

    redemptions.push(redemption);

    RedeemEvent(redemption.redeemer, redemption.amount, block.timestamp);
  }

  function approveRedemption(uint _index) public onlyOwner {
    require(redemptions[_index].amount >= 0);

    Redemption memory redemption = redemptions[_index];
    token.destroyTokens(redemption.amount);

    // remove order from orders array
    redemptions[_index] = redemptions[redemptions.length-1];
    redemptions.length--;
  }

  function declineRedemption(uint _index) public onlyOwner {
    require(redemptions[_index].amount >= 0);

    // remove order from orders array
    redemptions[_index] = redemptions[redemptions.length-1];
    redemptions.length--;
  }

  function getRedemptionsLength() public constant onlyOwner returns (uint) {
    return redemptions.length;
  }

  function getRedemption(uint _index) public onlyOwner returns (address, uint) {
    Redemption memory redemption = redemptions[_index];
    return (redemption.redeemer, redemption.amount);
  }

  function withdraw(address _to, uint _amount) public onlyOwner {
    _to.transfer(_amount);
  }

  /*
  * Fallback function in case someone accidentally sends Ether to the contract
   */
  function() public payable {}
}


/*
1. LNKSToken.deployed().then(function(instance) {token=instance;})
2. LNKSExchange.deployed().then(function(instance) {exchange=instance;})
3. token.mint(web3.eth.accounts[0],100)
4. exchange.setTokenAddress(token.address)
5. exchange.redeem(5)
6. exchange.approveRedemption(0)
 */
