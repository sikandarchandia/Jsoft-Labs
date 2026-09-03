# Task 4 - Blockchain Task: Smart Contract + API Integration

## Task Description
Technical Assessment for Blockchain Developer
Time: 40 mins ~ 1 hour

Demo Project: https://bitbucket.org/workspace860819/real_estate_platform_mvp_v1

## Requirements
- Add a new API into demo project (backend)
- Fetch info from a smart contract (made by yourself) from EVM chain through the API

## Implementation

### Smart Contract: PropertyRegistry.sol (Solidity 0.8.24, EVM)
Deployed on local Hardhat EVM network (chainId: 31337)

**Functions:**
- `listProperty(title, location, priceUSD)` — register a new property
- `getProperty(id)` — fetch single property
- `getAllProperties()` — fetch all properties
- `updatePrice(id, newPrice)` — update property price
- `removeProperty(id)` — deactivate property
- `totalProperties()` — total count

**Events:** `PropertyListed`, `PropertyUpdated`, `PropertyRemoved`

### Backend API (Express + ethers.js v6)
Port: 4002

| Endpoint | Description |
|---|---|
| `GET /contract/info` | Contract address, chainId, deployer, total properties |
| `GET /contract/properties` | All properties from on-chain state |
| `GET /contract/properties/:id` | Single property by ID |
| `GET /contract/balance/:address` | ETH balance of any address |

### Files
- `contracts/PropertyRegistry.sol` — Solidity smart contract
- `hardhat.config.js` — Hardhat 3 config with hardhat-ethers plugin
- `scripts/deploy.js` — Deploy + seed 3 properties
- `api/server.js` — Express API reading from contract via ethers.js
- `api/deployment.json` — Generated after deploy (contract address + ABI)

### Run
```bash
npx hardhat node               # start local EVM node
npx hardhat run scripts/deploy.js --network localhost   # deploy contract
node api/server.js             # start API on port 4002
```

## Test Results
- Contract deployed: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- 3 properties seeded on-chain (Miami, Austin, Seattle)
- All 4 API endpoints verified working
- Deployer balance: `9999.998 ETH` (gas spent on deploy + transactions)
