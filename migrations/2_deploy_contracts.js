var TGToken = artifacts.require("./TGToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TGToken, 1000000);
};