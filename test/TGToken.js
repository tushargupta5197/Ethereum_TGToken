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

	it('transfers ownership', function(){
		return TGToken.deployed().then(function(instance){
			tokenInstance = instance;
			// testing require, sending more tokens
			return tokenInstance.transfer.call(accounts[1], 999999999);
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'error message contains revert');
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
		}).then(function(success){
			assert.equal(success, true, 'it returns true');
			return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the Transfer event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'check sender');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'check receiver');
			assert.equal(receipt.logs[0].args._value, 250000, 'logs the amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 250000, 'adds the amount to receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 750000, 'deducts from the receiving amount');
		});
	});







});