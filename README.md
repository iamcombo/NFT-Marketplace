# Full stack NFT marketplace built with Polygon, Solidity, IPFS, & Next.js

### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```shell
git clone https://github.com/iamcombo/NFT-Marketplace
# install using NPM or YARN
npm install 
or 
yarn
```

2. Start the local Hardhat node

```shell
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```shell
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```shell
npm run dev
```