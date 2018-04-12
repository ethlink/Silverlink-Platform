pragma solidity ^0.4.8;

import "./SafeMath.sol";
import './OwnableMultiple.sol';
import './LNKSToken.sol';

contract LNKSExchange is OwnableMultiple {
  using SafeMath for uint;

  struct Order {
    address buyer;
    uint amount;
    uint timestamp;
  }

  struct Redemption {
    address redeemer;
    string location;
    uint amount;
    uint timestamp;
  }

  struct Certificate {
    string url;
    uint amount;
    uint timestamp;
  }

  LNKSToken public token;
  mapping(address => bool) usedAddresses;

  Order[] orders;
  Redemption[] redemptions;
  Certificate[] certificates;

  uint public fee = 0;
  uint silverReserves = 0;
  uint availableTokens = 0;
  uint silverPriceMarkup = 0;

  function LNKSExchange() {
    fee = 300; // 300 = 0.3% in 1-digit precision
    silverPriceMarkup = 3000; // 3000 = 3% in 3-digit precision
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
      amount: msg.value,
      timestamp: block.timestamp
    });

    orders.push(order);

    BuyDirectEvent(order.buyer, order.amount, order.timestamp);
  }

  function getOrder(uint _index) public constant onlyOwner returns (address, uint, uint) {
    Order memory order = orders[_index];
    return (order.buyer, order.amount, order.timestamp);
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

  function calculateFee(uint _amount) public constant returns (uint) {
    uint feeAmount = _amount * fee / 1000;

    if (feeAmount == 0) {
      return 1;
    } else {
      return feeAmount;
    }
  }

  function getOrdersLength() public constant onlyOwner returns (uint) {
    return orders.length;
  }

  function redeem(uint _value, string _location) public returns (uint) {
    require(token.balanceOf(msg.sender) >= _value);

    // Approve tokens transfer from sender to exchange vault
    token.approveFrom(msg.sender, this, _value);
    token.transferFrom(msg.sender, this, _value);

    // Take note of executed redemption
    Redemption memory redemption = Redemption({
      redeemer: msg.sender,
      amount: _value,
      location: _location,
      timestamp: block.timestamp
    });

    redemptions.push(redemption);

    RedeemEvent(redemption.redeemer, redemption.amount, redemption.timestamp);
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

    Redemption memory redemption = redemptions[_index];
    token.transfer(redemption.redeemer, redemption.amount);

    // remove order from orders array
    redemptions[_index] = redemptions[redemptions.length-1];
    redemptions.length--;
  }

  function getRedemptionsLength() public constant onlyOwner returns (uint) {
    return redemptions.length;
  }

  function getRedemption(uint _index) public constant onlyOwner returns (address, uint, string, uint) {
    Redemption memory redemption = redemptions[_index];
    return (
      redemption.redeemer,
      redemption.amount,
      redemption.location,
      redemption.timestamp
    );
  }

  function addCertificate(string _url, uint _amount) public onlyOwner {
    Certificate memory certificate = Certificate({
      url: _url,
      amount: _amount,
      timestamp: block.timestamp
    });

    silverReserves = silverReserves.add(certificate.amount);

    certificates.push(certificate);
  }

  function getCertificatesLength() public constant returns (uint) {
    return certificates.length;
  }

  function getCertificate(uint _index) public constant returns (string, uint, uint) {
    Certificate memory certificate = certificates[_index];
    return (
      certificate.url,
      certificate.amount,
      certificate.timestamp
    );
  }

  function deleteCertificate(uint _index) public onlyOwner {
    require(certificates[_index].amount >= 0);

    silverReserves = silverReserves.sub(certificates[_index].amount);

    certificates[_index] = certificates[certificates.length-1];
    certificates.length--;
  }

  function setAvailableTokens(uint _availableTokens) public onlyOwner {
    availableTokens = _availableTokens;
  }

  function tokensSupplyAvailable() public constant returns (int) {
    return int(availableTokens) - int(token.totalSupply());
  }

  function getSilverReserves() public constant returns (uint) {
    return silverReserves;
  }

  function setSilverPriceMarkup(uint _silverPriceMarkup) public onlyOwner returns (uint) {
    silverPriceMarkup = _silverPriceMarkup;
  }

  function getSilverPriceMarkup() public constant returns (uint) {
    return silverPriceMarkup;
  }

  function withdraw(address _to, uint _amount) public onlyOwner {
    _to.transfer(_amount);
  }

  /*
  * Fallback function in case someone accidentally sends Ether to the contract
   */
  function() public payable {}
}
