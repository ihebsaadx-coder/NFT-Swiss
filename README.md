# NFT Swiss

NFT Swiss is a web-based NFT marketplace. Connect a MetaMask wallet to explore marketplace listings, create NFTs, list them for sale, and view your collection. NFT images and metadata are stored on IPFS, and marketplace actions are handled by Ethereum smart contracts.

## Features

- Browse NFTs listed on the marketplace
- Create an NFT with an image, name, and description
- List and buy NFTs using your connected wallet
- View items in your collection

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [Ganache](https://archive.trufflesuite.com/ganache/) for a local development blockchain
- [MetaMask](https://metamask.io/) browser extension

## Run locally

### 1. Install dependencies

From the project directory, run:

```bash
npm install
```

### 2. Start Ganache

Start a local Ganache blockchain with the following settings:

- Host: `127.0.0.1`
- Port: `7545`
- Network ID: `5777`

Connect MetaMask to this local network and import one of Ganache's test accounts. Use test accounts only; do not use a wallet that holds real funds.

### 3. Deploy the smart contracts

In the project directory, run:

```bash
npx truffle migrate --network development --reset
```

This deploys the contracts to Ganache and updates the generated artifacts in `src/contracts/`.

### 4. Start the web app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) and connect MetaMask. Confirm MetaMask is using the same Ganache network.

## Available commands

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm test` | Run the React test runner |
| `npm run build` | Create an optimized production build |
| `npx truffle test --network development` | Run the smart contract tests against the local blockchain |

## Project structure

| Path | Description |
| --- | --- |
| `src/` | React app, styles, and generated contract artifacts |
| `src/Pages/` | Home, explore, create NFT, and collection pages |
| `src/components/` | Shared UI components |
| `contracts/` | Solidity smart contracts |
| `migrations/` | Truffle deployment scripts |
| `test/` | Smart contract tests |

