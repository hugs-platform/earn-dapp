import React, { FC } from "react";
import styles from "./connectAndDisconnectView.module.css";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { SelectAndConnectWalletButton } from "./SelectAndConnectWalletButton";

require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaLogin: FC = () => {
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();

  return (
    <div className={styles.connectAndDisconnectView_container}>
      <h1 className={styles.connectAndDisconnectView_title}>Earn</h1>
      {wallet ? <WalletDisconnectButton /> : <SelectAndConnectWalletButton />}
    </div>
  );
};

export default SolanaLogin;
