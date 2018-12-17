pragma solidity ^0.4.2;

contract TGToken {

	// Name
	string public name = "TG Token";
	// Symbol
	string public symbol = "TGT";
	// Standard
	string public standard = "TG Token v1.0";

	// Constructor
	// Set the total number of tokens
	// Read the total number of tokens

	uint256 public totalSupply;

	mapping(address => uint256) public balanceOf; 

	constructor (uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}
}