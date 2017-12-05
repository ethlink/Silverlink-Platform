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

  LNKSToken token;
  uint fee;
  mapping(address => bool) usedAddresses;
  Order[] orders;
  Redemption[] redemptions;

  function LNKSExchange() {
    fee = 30000000000000000; // 0.03 eth
  }

  function setTokenAddress(address _tokenAddress) public onlyOwner {
    token = LNKSToken(_tokenAddress);
  }

  event BuyDirectEvent(address _buyer, uint _amount);
  event RedeemEvent(address _redeember, uint _amount);

  function buyDirect() public payable {
    Order memory order = Order({
      buyer: msg.sender,
      amount: msg.value
    });

    orders.push(order);
    usedAddresses[msg.sender] = true;

    BuyDirectEvent(order.buyer, order.amount);
  }

  function getOrder(uint _index) public constant onlyOwner returns (address, uint) {
    Order memory order = orders[_index];
    return (order.buyer, order.amount);
  }

  function approveOrder(uint _index, uint _tokensAmount) public onlyOwner {
    require(orders[_index].amount > 0);

    Order memory order = orders[_index];

    // Deduct fee if address is never used
    if (usedAddresses[order.buyer] == false) {
      _tokensAmount = _tokensAmount.sub(fee);
      usedAddresses[order.buyer] == true;
    }

    // mint tokens for the buyer
    token.mint(order.buyer, _tokensAmount);

    // remove order from orders array
    orders[_index] = orders[orders.length-1];
    orders.length--;
  }

  function setNewFee(uint _fee) public onlyOwner {
    fee = _fee;
  }

  function getFee() constant returns (uint) {
    return fee;
  }

  function getOrdersLength() public constant onlyOwner returns (uint) {
    return orders.length;
  }

  function redeem(uint _value) public returns (uint) {
    require(token.balanceOf(msg.sender) >= _value);

    // Transfer tokens from sender to exchange vault
    token.approveFrom(msg.sender, this, _value);
    token.transferFrom(msg.sender, this, _value);

    // Take note of executed redemption
    Redemption memory redemption = Redemption({
      redeemer: msg.sender,
      amount: _value
    });

    redemptions.push(redemption);

    RedeemEvent(redemption.redeemer, redemption.amount);
  }

  function getRedemptionsLength() public constant onlyOwner returns (uint) {
    return redemptions.length;
  }

  function getRedemption(uint _index) public onlyOwner returns (address, uint) {
    Redemption memory redemption = redemptions[_index];
    return (redemption.redeemer, redemption.amount);
  }

  /*
  * Fallback function in case someone accidentally sends Ether to the contract
   */
  function() public payable {}
}


























  // function deleteEntity(address entityAddress) public returns(bool success) {
  //   if(!isEntity(entityAddress)) throw;
  //   uint rowToDelete = entityStructs[entityAddress].listPointer;
  //   address keyToMove   = entityList[entityList.length-1];
  //   entityList[rowToDelete] = keyToMove;
  //   entityStructs[keyToMove].listPointer = rowToDelete;
  //   entityList.length--;
  //   return true;
  // }
