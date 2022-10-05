var ForgivenetToken = artifacts.require("ForgivenetToken");
var RequestForForgiveness = artifacts.require("RequestForForgiveness");

module.exports = function(deployer) {
    deployer.deploy(ForgivenetToken);
    deployer.deploy(RequestForForgiveness);
};
