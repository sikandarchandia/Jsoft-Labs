# Task 5 - Web3 Task: MetaMask Wallet Integration

## Task Description
Technical Assessment for Web3 Developer
Time: 50 mins

Demo Project: https://bitbucket.org/workspace860819/real_estate_platform_mvp_v1

## Requirements Implemented

### 1. Wallet Connection
- Connect to MetaMask wallet via `wallet_requestPermissions` (forces popup every time)
- If MetaMask not detected → button shows "Install MetaMask" and opens metamask.io/download/

### 2. Display Wallet Address
- Connected address shown as short format `0xf39F...2266` with green pulse indicator
- ETH balance displayed alongside address

### 3. Account Management
- `accountsChanged` event listener — auto-updates when user switches accounts
- If all accounts disconnected → auto-disconnects from UI

### 4. Network Management
- `chainChanged` event listener → page reloads on network switch (standard Web3 practice)

## Implementation

### Files
- `src/hooks/useWallet.js` — custom React hook (ethers.js v5, Web3Provider)
- `src/components/layout/Navbar.jsx` — Connect Wallet button (desktop + mobile)
- `src/pages/Home.jsx` — CTA section Connect Wallet button wired up
- `src/App.jsx` — wallet state passed via props

### Tech Stack
- ethers.js v5 (`ethers.providers.Web3Provider`)
- React hooks (`useState`, `useCallback`, `useEffect`)
- MetaMask (EIP-1193 provider via `window.ethereum`)

### How It Works
1. User clicks "Connect Wallet"
2. MetaMask popup appears → user approves
3. Address + ETH balance shown in Navbar
4. Account/network changes handled automatically

## Deliverables
- [ ] Record video of how it works (Loom / Google Drive)
