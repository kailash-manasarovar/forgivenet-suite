var fgvntToken = artifacts.require("ForgivenetToken");

contract('MyToken', function(accounts) {

    it("should have total supply of 1000000000000.000000000000000000", async function () {
        var myTokenInstance;
        return fgvntToken.deployed().then(function(instance) {
            myTokenInstance = instance;
            return myTokenInstance.totalSupply.call();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toString(), "1000000000000000000000000000000", "Total supply figure with decimals is incorrect");
        });
    });

    it("first account should own all tokens", function() {
        var _totalSupply;
        var myTokenInstance;
        return fgvntToken.deployed().then(function(instance) {
            myTokenInstance = instance;
            return myTokenInstance.totalSupply.call();
        }).then(function(totalSupply) {
            _totalSupply = totalSupply;
            return myTokenInstance.balanceOf(accounts[0]);
        }).then(function(balanceAccountOwner) {
            assert.equal(balanceAccountOwner.toString(), _totalSupply.toString(), "Total Amount of tokens is owned by owner");
        });
    });


    it("second account should own no tokens", function() {
        var myTokenInstance;
        return fgvntToken.deployed().then(function(instance) {
            myTokenInstance = instance;
            return myTokenInstance.balanceOf(accounts[1]);
        }).then(function(balanceAccountOwner) {
            assert.equal(balanceAccountOwner.toString(), "0", "Total Amount of tokens is owned by some other address");
        });
    });



    it("should send token correctly", function() {
        var token;

        //    Get initial balances of first and second account.
        var account_one = accounts[0];
        var account_two = accounts[1];

        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;

        var BN = web3.utils.BN;
        var amount = new BN(10);

        return fgvntToken.deployed().then(function(instance) {
            token = instance;
            return token.balanceOf.call(account_one);
        }).then(function(balance) {
            account_one_starting_balance = web3.utils.toBN(balance);
            return token.balanceOf.call(account_two);
        }).then(function(balance) {
            account_two_starting_balance = web3.utils.toBN(balance);
            return token.transfer(account_two, amount, {from: account_one});
        }).then(function() {
            return token.balanceOf.call(account_one);
        }).then(function(balance) {
            account_one_ending_balance = web3.utils.toBN(balance);
            return token.balanceOf.call(account_two);
        }).then(function(balance) {
            account_two_ending_balance = web3.utils.toBN(balance);

            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance.toNumber(), account_two_starting_balance.toNumber() + amount.toNumber(), "Amount wasn't correctly sent to the receiver");
        });
    });

});