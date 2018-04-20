pragma solidity ^0.4.8;

/// @title LNKS Token. This Token will remain the cornerstone of the entire organization. It will have an Ethereum address and from the moment that address is publish until the end, it will remain the same, and should. The Token should be as simple as it possibly can be and should not be able to terminate. It's state remains so that those who control their Tokens will continue to do so.
/// @author Karolis Ramanauskas <hello@karolisram.com>

import "./SafeMath.sol";
import "./OwnableMultiple.sol";
import "./ERC20.sol";
import './LNKSExchange.sol';


/*
 * Basic token
 * Basic version of StandardToken, with no allowances
 */
contract StandardToken is ERC20 {
  using SafeMath for uint;

  mapping(address => uint) balances;
  mapping (address => mapping (address => uint)) allowed;
  uint256 supply = 0;

  // Get the total token supply in circulation
  function totalSupply() public constant returns (uint) {
    return supply;
  }

  /*
   * Fix for the ERC20 short address attack
   */
  modifier onlyPayloadSize(uint size) {
    require(msg.data.length < size + 4);
    _;
  }

  function balanceOf(address _owner) public constant returns (uint balance) {
    return balances[_owner];
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    require(balances[msg.sender] >= _value);

    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);

    return true;
  }

  function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
    var allowance = allowed[_from][msg.sender];

    require(balances[_from] >= _value && allowance >= _value);

    balances[_to] = balances[_to].add(_value);
    balances[_from] = balances[_from].sub(_value);

    allowed[_from][msg.sender] = allowance.sub(_value);

    Transfer(_from, _to, _value);

    return true;
  }

  function approve(address _spender, uint _value) public returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);

    return true;
  }

  function approveFrom(address _owner, address _spender, uint _value) public returns (bool success) {
    allowed[_owner][_spender] = _value;
    Approval(_owner, _spender, _value);

    return true;
  }

  function allowance(address _owner, address _spender) public constant returns (uint remaining) {
    return allowed[_owner][_spender];
  }
}


contract LNKSToken is StandardToken, OwnableMultiple {
  string public constant name = "Link Platform";
  string public constant symbol = "LNKS";
  uint public constant decimals = 3;

  function mint(address _spender, uint _value) public onlyOwner {
    balances[_spender] += _value;
    supply += _value;
  }

  function destroyTokens(uint _value) external {
    require(balances[msg.sender] >= _value);

    balances[msg.sender] = balances[msg.sender].sub(_value);
    supply = supply.sub(_value);

    DestroyTokensEvent(msg.sender, _value);
  }

  event DestroyTokensEvent(address indexed _from, uint _value);
}
