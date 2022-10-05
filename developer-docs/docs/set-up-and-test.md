There are a few steps you must take before the contracts are functional and the front end works.

## Steps

This is the flow. Full details are given below.

!!! warning
    Skip any of these steps and the application won't work as expected, and the error messages will be meaningless.

1. Get the ForgivenetToken contract address from output. In this example, that is `0x4A9CDafEA031101cFACA51aa8b73Abba8Cd0275b`.
2. Get the RFF contract address. In our example, this is `0x24D3c2a54e453A6bb7E1B1046946f56293c64F1C`.
2. Get the admin account address from Ganache. This should be address 0, or `0xE06a6151261154ff490ef5e4ED383Cb3F3F2f020`.
3. Add the ETH receiving account to the main contract by calling the `addEthReceivingAccount` method on the RFF contract instance and passing a different Ganache account, e.g. address 5, or `0xb2f933805B2c401e0c1e3aD348Aa34C1cF3CdE32`.
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
```

### Request For Forgiveness contract

```js
let instance = await RequestForForgiveness.deployed()
```

## Add ETH receiving account

```js
instance.addEthReceivingAccount('0xb2f933805B2c401e0c1e3aD348Aa34C1cF3CdE32') 
```

## Add token to RFF contract

```js
instance.addToken('0x4A9CDafEA031101cFACA51aa8b73Abba8Cd0275b')
```

## Approve RFF to transfer 1000000 tokens

```js
token.approve('0x24D3c2a54e453A6bb7E1B1046946f56293c64F1C', 1000000)
```

## Transfer 1000000 tokens to RFF contract

```js
token.transfer('0x24D3c2a54e453A6bb7E1B1046946f56293c64F1C', 1000000)
```

## Double check RFF contract owns 1000000 FRGVN tokens

```js
token.balanceOf('0x24D3c2a54e453A6bb7E1B1046946f56293c64F1C')
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

## Check disincentive

```js
instance.getDisincentive()
```

## Call request forgiveness method

Create a string of correct length. For example:

```js
string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N'
```

Call the method sending the string with a value of ETH that is more than the disincentive.

```js
instance.requestForgiveness(string, {value: 1000000000000000})
```
