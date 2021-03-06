import { FC, useEffect } from "react";
import React from "react";
import styles from "./selectAndConnectWallet.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const SelectAndConnectWalletButton: FC = () => {
  const { setVisible } = useWalletModal();
  const { wallet, connect, connecting, publicKey, disconnect } = useWallet();

  useEffect(() => {
    if (!publicKey && wallet) {
      connect().catch((error) => {
        console.log("Error connecting to the wallet: ", error.message);
      });
    }
  }, [wallet]);

  const handleWalletClick = () => {
    // for checking if there is a wallet
    if (!wallet) {
      setVisible(true);
    } else {
      // for connecting or disconnecting the wallet
      try {
        if (publicKey) {
          disconnect();
        } else {
          connect();
        }
      } catch (error: any) {
        alert(`Error connecting to the wallet: ${error.message}`);
      }
    }
  };

  return (
    <button className={styles.selectAndConnectWallet_container} onClick={handleWalletClick} disabled={connecting}>
      {publicKey ? `0x${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : `Connect Wallet`}
    </button>
  );
};
