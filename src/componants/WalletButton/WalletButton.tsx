// app/components/WalletButton.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type EthereumProvider = {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function WalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const connectingRef = useRef(false); // évite les doubles appels en dev (StrictMode)

  const connect = useCallback(async () => {
    setError(null);
    if (connectingRef.current) return;
    connectingRef.current = true;

    try {
      const eth = window.ethereum;
      if (!eth || !eth.isMetaMask) {
        throw new Error("Provider MetaMask introuvable. Installez l'extension ou utilisez un navigateur compatible.");
      }

      // Demande explicite d’accès aux comptes
      const accounts: string[] = await eth.request({ method: 'eth_requestAccounts' });

      if (!accounts || accounts.length === 0) {
        throw new Error("Aucun compte retourné par MetaMask.");
      }

      setAccount(accounts[0]);

      // Récupérer le réseau
      const id: string = await eth.request({ method: 'eth_chainId' });
      setChainId(id);
    } catch (e: any) {
      // Gestion des codes d’erreurs fréquents
      if (e?.code === 4001) {
        setError("Connexion refusée par l’utilisateur.");
      } else if (e?.code === -32002) {
        setError("Une requête de connexion est déjà en cours dans MetaMask. Ouvrez MetaMask et validez.");
      } else {
        setError(e?.message ?? "Échec de connexion à MetaMask.");
      }
    } finally {
      connectingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const eth = window.ethereum;
    if (!eth || !eth.on) return;

    const handleAccountsChanged = (accs: string[]) => {
      setAccount(accs?.[0] ?? null);
    };
    const handleChainChanged = (id: string) => {
      setChainId(id);
    };

    eth.on('accountsChanged', handleAccountsChanged);
    eth.on('chainChanged', handleChainChanged);

    return () => {
      eth.removeListener?.('accountsChanged', handleAccountsChanged);
      eth.removeListener?.('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <div className="p-4 rounded-lg border">
      {account ? (
        <div>
          <p>Compte : {account}</p>
          <p>Réseau (chainId) : {chainId}</p>
        </div>
      ) : (
        <button onClick={connect} className="px-4 py-2 rounded bg-black text-white">
          Se connecter avec MetaMask
        </button>
      )}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
