const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"string","name":"data","type":"string"},{"indexed":false,"internalType":"uint256","name":"donation","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RequestMade","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"addEthReceivingAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"ercTokenAddress","type":"address"}],"name":"addToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDisincentive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"forgiveness_request","type":"string"}],"name":"requestForgiveness","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"setDisincentiveInWei","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
// ROPSTEN const deployedAddress =
//RINKEBY const deployedAddress = "0x338F028Ca759C41787426521787557a887365eA0";
// MAINNET
const deployedAddress = "0xf9262f3fFFf92e6d8e4a3b59AcB4DFCcAe160878";

var myContract;
var address;

App = {

    myContract: null,
    web3Provider: null,
    address: null,

    init: async function() {
        return await App.initWeb3();
    },

    // connect browser to web3
    initWeb3: async function() {

        // silence warning - remove 14 Jan
        //ethereum.autoRefreshOnNetworkChange = false; // commented out 2/2/20 in attempt to fix status.im error

        // Modern dapp browsers...
        if (window.ethereum) {

            App.web3Provider = window.ethereum;

            try {
                await window.ethereum.enable();

            } catch (error) {

                console.error("User denied account access");
            }

            ethereum.on('chainChanged', () => { document.location.reload(); });
        }

        // Legacy dapp browsers...consider deleting
        else if  (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }

        // If no injected web3 instance is detected, fall back to Ganache NOT FOR PRODUCTION
        else {
            App.web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/6bab3b4785774a929addd85dbcb4fff5');
        }

        // this changes the address details if user swaps account
        window.ethereum.on('accountsChanged', function (accounts) {
            App.address = accounts[0];
            console.log(App.address);
            document.location.reload();
        });

        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    /*
    // connect browser to web3
    initWeb3: async function() {

        ethereum.enable();

        if (window.ethereum) {

            web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/6bab3b4785774a929addd85dbcb4fff5"));


        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/6bab3b4785774a929addd85dbcb4fff5"));
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }

        console.log(web3.version);

        return await App.initContract();

    },*/



    initContract: async function() {

        myContract = new web3.eth.Contract(abi, deployedAddress);
        address = myContract.givenProvider.selectedAddress;
        //console.log(myContract);
        //console.log(address);

       // var x = myContract.methods.getDisincentive().call();
       // console.log(x);

    },




    validateInput: function() {

        var textarea = document.forms["request-form"]["requestText"];
        var donation = document.forms["request-form"]["donation"];

        if (textarea.value == "")
        {
            window.alert("Please enter some text!");
            textarea.focus();
            return false;
        }

        if (textarea.value.length <= 500)
        {
            window.alert("Your request is too short!");
            textarea.focus();
            return false;
        }

        if (textarea.value.length >= 2000)
        {
            window.alert("Your request is too long!");
            textarea.focus();
            return false;
        }

        if (donation.value <= 0.00044)
        {
            window.alert("A little more ETH please.");
            donation.focus();
            return false;
        }

        App.requestForgiveness();return false;
    },


  requestForgiveness: function() {

	   	ethereum.enable();

        //console.log(address);
        //console.log(myContract);

        // test methods
        var x = myContract.methods.getDisincentive().call();
        //console.log(x);

        // request details
        var requestText = document.getElementById("requestText").value;
        //var requestText = LZString.compress(text);
        var donation = document.getElementById("donation").value;
        var weiValue = web3.utils.toWei(donation);

        myContract.methods.requestForgiveness(requestText).send({ from: address, value: weiValue, gas: 100000 }).
            on('transactionHash', function(hash){
                console.log(hash);
              // document.getElementById("result").innerHTML = "'<a href=https://rinkeby.etherscan.io/tx/' + hash + '</a>'";
            });
    }

};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
