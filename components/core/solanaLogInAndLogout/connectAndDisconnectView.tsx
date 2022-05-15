import React, { FC } from 'react';
import styles from "./logIn.module.css";
import {useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SelectAndConnectWalletButton } from './SelectAndConnectWalletButton';

require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaLogin: FC = () => {
    const wallet = useAnchorWallet();
    const { publicKey } = useWallet();

    return (
      <div className={styles.connectAndDisconnectView_container}>
        { wallet ? 
          <div>
            <p>Connected: {publicKey?.toBase58()}</p>
            <WalletDisconnectButton />
          </div>
          :
          <div>
            <p>Not connected</p>
            <SelectAndConnectWalletButton />
          </div>
        }
      </div>
    );
};

export default SolanaLogin;