import React, { FC } from "react";
import styles from "./connectAndDisconnectView.module.css";
import { SelectAndConnectWalletButton } from "./ConnectAndDisconnectWalletButton";

require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaLogin: FC = () => {
  return (
    <div className={styles.connectAndDisconnectView_container}>
      <h1 className={styles.connectAndDisconnectView_title}>Earn</h1>
      <SelectAndConnectWalletButton />
    </div>
  );
};

export default SolanaLogin;
