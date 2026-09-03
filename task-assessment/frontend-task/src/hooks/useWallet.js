import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  const hasWallet = typeof window !== 'undefined' && !!window.ethereum;

  const fetchBalance = useCallback(async (addr) => {
    if (!window.ethereum || !addr) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const bal = await provider.getBalance(addr);
      setBalance(ethers.utils.formatEther(bal));
    } catch {}
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    setConnecting(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('wallet_requestPermissions', [{ eth_accounts: {} }]);
      const accounts = await provider.send('eth_requestAccounts', []);
      const addr = accounts[0];
      const network = await provider.getNetwork();
      setAccount(addr);
      setChainId(network.chainId);
      await fetchBalance(addr);
    } catch (err) {
      if (err.code === 4001) {
        setError('Connection rejected. Please approve in MetaMask.');
      } else {
        setError(err.message || 'Connection failed');
      }
    } finally {
      setConnecting(false);
    }
  }, [fetchBalance]);

  const disconnect = useCallback(() => {
    setAccount(null);
    setBalance(null);
    setChainId(null);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) { disconnect(); return; }
      setAccount(accounts[0]);
      fetchBalance(accounts[0]);
    };
    const handleChainChanged = () => window.location.reload();
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [disconnect, fetchBalance]);

  const shortAddress = account ? `${account.slice(0, 6)}...${account.slice(-4)}` : '';

  return { account, shortAddress, balance, chainId, connecting, error, connect, disconnect, hasWallet };
}
