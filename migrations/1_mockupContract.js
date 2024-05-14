var MockupContract = artifacts.require("./MockupContract.sol");

module.exports = function(deployer) {
    deployer.deploy(MockupContract);
};