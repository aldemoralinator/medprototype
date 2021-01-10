var HerbalMedicine = artifacts.require("./HerbalMedicine.sol");

module.exports = function(deployer) {
  deployer.deploy(HerbalMedicine);
};
