!!! warning
    * Local set up instructions are not yet complete. 
    * Please use the [Goerli testnet](/goerli/prerequisites) instructions for now.


You will need the following:

## IDE

Create a new project in your IDE of choice. For example:

* WebStorm.
* Sublime.
* VSCode.
* Whatever you're comfortable with.

## Node

Download and install [Node](https://nodejs.org/en/download/).

Node has all the libraries we need for the project.

## Truffle

Install Truffle.

```bash
npm install -g truffle
```

Truffle is a library which allows us to compile, deploy, and interact with Solidity smart contracts locally.

The backend application is a Solidity app. You can see copies of the original files in the `/contracts` folder. We will be working with these.

!!! note
    `Migrations.sol` is a default truffle file and is not part of the application.

!!! danger
    Do not change any code in the Solidity contracts unless you know what you are doing.

`FRGVN.sol` and `RequestForForgiveness.sol` are the application ERC20 token and smart contract respectively. These two files are now live and functional on the [Ethereum mainnet](https://etherscan.io/token/0x9d29f93e0a4c0bc5ac1e13d5b72038f35c81f325). 

!!! important
    We are not looking to change anything on the backend at this time, although in the future we will build a suite of smart contracts related to the app's Solidity foundation.

## Ganache

Download and install [Ganache](https://trufflesuite.com/ganache/).

Ganache gives us a live local RPC server with built-in and funded Ethereum accounts. We use these accounts to test our Solidity apps.



