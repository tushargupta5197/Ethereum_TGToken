pragma solidity ^0.4.2;

contract TGToken {
	// Constructor
	// Set the total number of tokens
	// Read the total number of tokens

	uint256 public totalSupply;

	constructor () public {
		totalSupply = 1000000;
	}
}