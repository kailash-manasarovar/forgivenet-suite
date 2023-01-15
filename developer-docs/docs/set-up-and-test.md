There are a few steps you must take before the contracts are functional and the front end works locally.

!!! important
    * The following steps should be in one script so you don't have to do it every time. 
    * Without automation, this is a pain right now, and I recommend working against a testnet directly instead.
    * It is also erroring and I believe it is to do with ETH/WEI format mismatches but haven't been able to fix it.

## Steps

This is the flow. Full details are given below.

!!! warning
    Skip any of these steps and the application won't work as expected. Moreover, the error messages will be meaningless.

1. Get the ForgivenetToken contract address.
2. Get the RequestForForgiveness contract address. 
3. Set the receiving account address from Ganache.
4. Add the ForgivenetToken contract to the smart contract by calling the `addToken` method with the token contract address.
5. In the token contract, approve the RFF contract address for 1000000 tokens by calling the `approve` method. 
6. Transfer 1000000 tokens to the RFF smart contract address from the token contract.
7. Check disincentive. For testing this can be 0.



## Start Truffle console

We'll use truffle console to set up and test everything. Run the following command which will give you a console cursor for calling truffle commands.

```js
niramisa@Drs-MacBook-Pro 1FRGVN % truffle console
truffle(development)> 
```

## Create contract instances

We need objects of the contracts to call methods on.

### Token contract

```js
let token = await ForgivenetToken.deployed()
/* test address output */
token.address
```

### Request For Forgiveness contract

```js
let request = await RequestForForgiveness.deployed()
/* test address output */
request.address
```

## Add ETH receiving account

```js
let bank = await web3.eth.getAccounts()[5]
/* test address output */
bank
request.addEthReceivingAccount(bank) 
```

## Add token to RFF contract

```js
request.addToken(token.address)
```

## Approve RFF to transfer 1000000 tokens

```js
token.approve(request.address, 1000000)
```

## Transfer 1000000 tokens to RFF contract

```js
token.transfer(request.address, 1000000)
```

## Double check RFF contract owns 1000000 FRGVN tokens

```js
token.balanceOf(request.address)
```

### Output

```json
BN {
  negative: 0,
  words: [ 1000000, <1 empty item> ],
  length: 1,
  red: null
}
```

### Convert output to number

```js
(await token.balanceOf(request.address)).toNumber()
```

## Check disincentive

```js
request.getDisincentive()
```

## Call request forgiveness method

Create a string of correct length. For example:

```js
string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N'
```

Call the method sending the string with a value of ETH that is more than the disincentive.

```js
request.requestForgiveness(string, {value: 1000000000000000})
```