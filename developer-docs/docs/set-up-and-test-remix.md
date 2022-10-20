Go to [Remix](https://remix-project.org/) and click through to REMIX IDE.

## Steps

This is the flow. Full details are given below.

!!! warning
    Skip any of these steps and the application won't work as expected. Moreover, the error messages will be meaningless.

1. Get the ForgivenetToken contract address from output. In this example, that is `0x04F0302d27bD225F70ad083460DAD636eDc3780C`.
2. Get the RFF contract address. In our example, this is `0x9bd91b1062f29d40080A092bEbdd98daC6c635c6`.
3. Get the admin account address from Ganache. This should be address 0, or `0x7e8f8A0d509E419bb6bB7fd6e68dF38e2467473a`.
4. Add the ETH receiving account to the main contract by calling the `addEthReceivingAccount` method on the RFF contract instance and passing a different Ganache account, e.g. address 5, or `0x30171Cd8Bf20Dd8E9cD46Ad80E52967e0a4cDcea`.
5. Add the ForgivenetToken contract to the smart contract by calling the `addToken` method with the token contract address.
6. In the token contract, approve the RFF contract address for 1000000 tokens by calling the `approve` method.
7. Transfer 1000000 tokens to the RFF smart contract address from the token contract.
8. Check disincentive. For testing this can be 0.



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
instance.addEthReceivingAccount('0x30171Cd8Bf20Dd8E9cD46Ad80E52967e0a4cDcea') 
```

## Add token to RFF contract

```js
instance.addToken('0x04F0302d27bD225F70ad083460DAD636eDc3780C')
```

## Approve RFF to transfer 1000000 tokens

```js
token.approve('0x9bd91b1062f29d40080A092bEbdd98daC6c635c6', 1000000000)
```

## Transfer 1000000 tokens to RFF contract

```js
token.transfer('0x9bd91b1062f29d40080A092bEbdd98daC6c635c6', 1000000000)
```

## Double check RFF contract owns 1000000 FRGVN tokens

```js
token.balanceOf('0x9bd91b1062f29d40080A092bEbdd98daC6c635c6')
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
(await token.balanceOf('0x9bd91b1062f29d40080A092bEbdd98daC6c635c6')).toNumber()
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

!!! warning
    This last method always fails and I don't know why, so I'm going to check how to write it in Remix.