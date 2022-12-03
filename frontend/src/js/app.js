const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"string","name":"data","type":"string"},{"indexed":false,"internalType":"uint256","name":"donation","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RequestMade","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"addEthReceivingAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"ercTokenAddress","type":"address"}],"name":"addToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDisincentive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"forgiveness_request","type":"string"}],"name":"requestForgiveness","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"setDisincentiveInWei","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
// GOERLI
const deployedAddress = "0xD69D780C017656C15A235b2F8fFaC65a469F8B34";
// SEPOLIA
// const deployedAddress = "0x9BA081fA6612456EBba531c95A23d2CC6004190D";
// MAINNET
// const deployedAddress = "0xf9262f3fFFf92e6d8e4a3b59AcB4DFCcAe160878";

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

        // Modern dapp browsers...
        if (window.ethereum) {

            App.web3Provider = window.ethereum;

            try {
               const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            } catch (err) {
                console.error("Failed with error: " + err);
            }

            ethereum.on('chainChanged', () => { document.location.reload(); });
        }

        // this changes the address details if user swaps account
        window.ethereum.on('accountsChanged', function (accounts) {
            App.address = accounts[0];
            // console.log(App.address);
            document.location.reload();
        });

        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },


    initContract: async function() {

        myContract = new web3.eth.Contract(abi, deployedAddress);
        address = myContract.givenProvider.selectedAddress;

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

        if (donation.value < 0.000001)
        /* PRODUCTION if (donation.value <= 0.01) */
        {
            window.alert("A little more ETH please.");
            donation.focus();
            return false;
        }

        App.requestForgiveness();return false;
    },


  requestForgiveness: function() {

        // test methods
        // var x = myContract.methods.getDisincentive().call();
        // console.log(x);

        // request details
        var requestText = document.getElementById("requestText").value;
        var donation = document.getElementById("donation").value;
        var weiValue = web3.utils.toWei(donation);


        myContract.methods.requestForgiveness(requestText).send({ from: address, value: weiValue }).
            on('transactionHash', function(hash){
                url = 'https://goerli.etherscan.io/tx/' + hash;
                /* PRODUCTION url = 'https://etherscan.io/tx/' + hash; */
                document.getElementById('requestText').value = "Be patient...";
            })
            .on('confirmation', function(confNumber, receipt, latestBlockHash) {
                document.getElementById('requestText').value = "Success!! Click the link below to see your confirmation on Etherscan.";
                document.getElementById("result").innerHTML = '<a href="' + url + ' " target="_blank">Latest forgiveness request confirmation</a>';
           });
    }

};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
