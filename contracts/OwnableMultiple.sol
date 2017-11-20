pragma solidity ^0.4.8;


/* MultiAccountValidator
*
* Base contract with multiple owners
*/
contract OwnableMultiple {
    mapping(address => bool) public owners;

    function OwnableMultiple() {
        owners[msg.sender] = true;
    }

    function validate(address addr) constant returns (bool) {
        return owners[addr];
    }

    modifier onlyOwner() {
      require(owners[msg.sender] == true);
      _;
    }

    function addOwner(address addr) {
      if(owners[msg.sender])
        owners[addr] = true;
    }

    function removeOwner(address addr) {
      if (owners[msg.sender])
        owners[addr] = false;
    }
}
