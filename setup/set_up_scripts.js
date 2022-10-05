require('dotenv').config();

const Web3 = require("web3");

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const { abi } = JSON.parse(fs.readFileSync("../build/contracts/RequestForForgiveness.json"));

async function main() {
    // Configuring the connection to an Ethereum node
    const network = "http://127.0.0.1:7545";
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            network
        )
    );
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);
    // Creating a Contract instance
    const contract = new web3.eth.Contract(
        abi,
        // Replace this with the address of your deployed contract
        process.env.DEMO_CONTRACT
    );
    // Issuing a transaction that calls the `echo` method
    const tx = contract.methods.getDisincentive();
    const receipt = await tx
        .send({
            from: signer.address,
            gas: await tx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        });
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();