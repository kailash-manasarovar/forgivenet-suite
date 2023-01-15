## Clone the repo

```sh
git clone https://github.com/kailash-manasarovar/forgivenet-suite.git
git submodule init # once only
git submodule update
```

## npm install

From the root, run:

```sh
npm install
```

## Run the app

`cd` to the `forgivenet-frontend/src` directory, check you're on the goerli branch with `git branch`, and run the following:

```sh
npx http-server
```

## Use the app

The live app is now available at [http://127.0.0.1:8080](http://127.0.0.1:8080
). Connect your wallet account and select the Goerli test network.

Test the app.

!!! important
    Each test request only requires 0.00001 ETH.