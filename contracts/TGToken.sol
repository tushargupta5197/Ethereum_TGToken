pragma solidity ^0.4.2;

contract TGToken {

	// Name
	string public name = "TG Token";
	// Symbol
	string public symbol = "TGT";
	// Standard
	string public standard = "TG Token v1.0";

	//transfer event
	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	);

	// Constructor
	// Set the total number of tokens
	// Read the total number of tokens

	uint256 public totalSupply;

	mapping(address => uint256) public balanceOf; 

	constructor (uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}

	// Transfer

	function transfer(address _to, uint256 _value) public returns (bool success) {
		// exception if does not have enough
		require(balanceOf[msg.sender] >= _value);
		// transfer the balance
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		// transfer event
		Transfer(msg.sender, _to, _value);
		// return boolean
		return true;
		
	}
}