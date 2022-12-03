Before we can interact with the Solidity smart contracts, we have to compile and deploy them. We do this with truffle.

## Clone the repo

* Open a terminal window.
* Clone the repo:
```bash
git clone https://github.com/kailash-manasarovar/forgivenet-suite.git 
```
* `cd` to the project root.

## Initialise

Run the following at the project root to set up truffle:

```bash
truffle init
```

## Compile 

Run the following command to compile the Solidity smart contracts.

```bash
truffle compile
```

This command picks up any `.sol` files in the `/contracts` folder and compiles them. You will see a bunch of output and eventually a new folder `/build` which contains the compiled contracts in `json` form.

This is what you should see in your build folder after compiling.

![My compiled contracts](/images/compiled-contracts.png)

## Start up Ganache

Ganache is the local RPC server mimicking the blockchain. It has ready-made accounts and test ETH for calling smart contract methods.

The `truffle-config.js` file has the relevant details required for running the Ganache server.

## Deploy

Now we can deploy the contract to our local running network on Ganache.

!!! important
    Everything is set up to here, so you don't have to do anything until this point.

!!! info
    The file `2_deploy_contract.js` is provided with the relevant migrate code. 

Run the following command:

```bash
truffle migrate
```

You should see output like this:

```bash
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x32bc848acea3f052b237c8f11407798218c799320f43fe8340c8e1447606e41d
   > Blocks: 0            Seconds: 0
   > contract address:    0xab62348c4B93CF1133C6d90f08572a6FcdFb5446
   > block number:        1
   > block timestamp:     1663674697
   > account:             0xE06a6151261154ff490ef5e4ED383Cb3F3F2f020
   > balance:             99.99616114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


2_deploy_contracts.js
=====================

   Replacing 'ForgivenetToken'
   ---------------------------
   > transaction hash:    0x45a70c3ca2addd3d48bd55d3c75f4df954cbc0ef98b5f505722749fbc6218cba
   > Blocks: 0            Seconds: 0
   > contract address:    0x4A9CDafEA031101cFACA51aa8b73Abba8Cd0275b
   > block number:        3
   > block timestamp:     1663674698
   > account:             0xE06a6151261154ff490ef5e4ED383Cb3F3F2f020
   > balance:             99.96446538
   > gas used:            1542450 (0x178932)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.030849 ETH


   Replacing 'RequestForForgiveness'
   ---------------------------------
   > transaction hash:    0xf83460b17af21e191fe1ecc9f57f8b09228ef88ea7a71be111aac39ed668a09f
   > Blocks: 0            Seconds: 0
   > contract address:    0x24D3c2a54e453A6bb7E1B1046946f56293c64F1C
   > block number:        4
   > block timestamp:     1663674698
   > account:             0xE06a6151261154ff490ef5e4ED383Cb3F3F2f020
   > balance:             99.94872204
   > gas used:            787167 (0xc02df)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01574334 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.04659234 ETH

Summary
=======
> Total deployments:   3
> Final cost:          0.0504312 ETH

```

Use the information from the deployed local contracts to set up and test the contracts with truffle console.