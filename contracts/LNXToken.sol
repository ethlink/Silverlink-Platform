pragma solidity ^0.4.17; //solhint-disable-line


contract ERC20Basic {
    uint public totalSupply;
    function balanceOf(address who) public constant returns (uint);
    function transfer(address to, uint value) public;
    event TransferEvent(address indexed from, address indexed to, uint value);
}


library SafeMath {

    function mul(uint a, uint b) internal pure returns (uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint a, uint b) internal pure returns (uint) {
        assert(b > 0);
        uint c = a / b;
        assert(a == b * c + a % b);
        return c;
    }

    function sub(uint a, uint b) internal pure returns (uint) {
        assert(b <= a);
        return a - b;
    }

    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        assert(c >= a);
        return c;
    }

    function max64(uint64 a, uint64 b) internal pure returns (uint64) {
        return a >= b ? a : b;
    }

    function min64(uint64 a, uint64 b) internal pure returns (uint64) {
        return a < b ? a : b;
    }

    function max256(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    function min256(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    function assert(bool assertion) internal pure {
        if (!assertion) { require(assertion); } //
    }
}


contract BasicToken is ERC20Basic {

    using SafeMath for uint;
    mapping(address => uint) public balances;

    modifier onlyPayloadSize(uint size) {
        if (msg.data.length < size + 4) {
            require(msg.data.length > size + 4); //
        }
        _;
    }

    function transfer(address _to, uint _value) public onlyPayloadSize(2 * 32) {
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        TransferEvent(msg.sender, _to, _value);
    }

    function balanceOf(address _owner) public constant returns (uint balance) {
        return balances[_owner];
    }
}


contract ERC20 is ERC20Basic {

    function allowance(address owner, address spender) public constant returns (uint);
    function transferFrom(address from, address to, uint value) public;
    function approve(address spender, uint value) public;
    event Approval(address indexed owner, address indexed spender, uint value);
}


contract StandardToken is BasicToken, ERC20 {

    mapping (address => mapping (address => uint)) public allowed;

    function transferFrom(address _from, address _to, uint _value) public {

        var _allowance = allowed[_from][msg.sender];
        balances[_to] = balances[_to].add(_value);
        balances[_from] = balances[_from].sub(_value);
        allowed[_from][msg.sender] = _allowance.sub(_value);
        TransferEvent(_from, _to, _value);
    }
        // Check is not needed because sub(_allowance, _value) will already throw if this condition is not met
        // if (_value > _allowance) throw;

    function approve(address _spender, uint _value) public {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
    }

    function allowance(address _owner, address _spender) public constant returns (uint remaining) {
        return allowed[_owner][_spender];
    }
}


contract Ownable {

    address public owner;

    function Ownable() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) { require(msg.sender == owner);} //CORRECCION
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) { owner = newOwner; }
    }
}


contract MintableToken is StandardToken, Ownable {

    event MintEvent(address indexed to, uint value);
    event MintFinished();

    bool public mintingFinished = false;
    uint public totalSupply = 0;

    modifier canMint() {
        if (mintingFinished) require(!mintingFinished); //CORRECCION
        _;
    }

    function mint(address _to, uint _amount) public onlyOwner canMint returns (bool) {
        totalSupply = totalSupply.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        MintEvent(_to, _amount);
        return true;
    }

    function finishMinting() public onlyOwner returns (bool) {
        mintingFinished = true;
        MintFinished();
        return true;
    }
}


contract Pausable is Ownable {

    event PauseEvent(); //
    event UnpauseEvent(); //

    bool public paused = false;

    modifier whenNotPaused() {
        if (paused) require(!paused); //
        _;
    }

    modifier whenPaused {
        if (!paused) require(paused); //
        _;
    }

    function pause() public onlyOwner whenNotPaused returns (bool) {
        paused = true;
        PauseEvent();
        return true;
    }

    function unpause() public onlyOwner whenPaused returns (bool) {
        paused = false;
        UnpauseEvent();
        return true;
    }
}


contract PausableToken is StandardToken, Pausable {

    function transfer(address _to, uint _value) public whenNotPaused {
        super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint _value) public whenNotPaused {
        super.transferFrom(_from, _to, _value);
    }
}


contract Token is PausableToken, MintableToken {

    string public   name =           "LNX Token";
    string public   symbol =         "LNX";
    uint public     decimals =       18;
    uint public     totalSupply;

}


contract Final is Token {

    function Final() public {} //solhint-disable-line
}
