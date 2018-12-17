var TGToken = artifacts.require("./TGToken.sol");

contract('TGToken', function(accounts){
	var tokenInstance;

	it('sets the name of the token', function(){
		return TGToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'TG Token', 'has correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'TGT', 'has correct symbol');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'TG Token v1.0', 'has correct standard');
		});
	})

	it('sets the total supply upon deployment', function(){
		return TGToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'sets total supply to 1,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to admin account')
		});

	});
});