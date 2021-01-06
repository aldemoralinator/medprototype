var NestedStruct = artifacts.require("./NestedStruct.sol");

module.exports = function(deployer) {
  deployer.deploy(NestedStruct);
};
