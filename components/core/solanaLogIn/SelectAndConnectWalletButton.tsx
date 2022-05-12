import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const SelectAndConnectWalletButton: FC = () => {
    const { setVisible } = useWalletModal();
    const { wallet, connect, connecting, publicKey } = useWallet();

    useEffect(() => {
        if (!publicKey && wallet) {
            connect().catch(error => {
                console.log("Error connecting to the wallet: ", (error as any).message);
            });
        }
    }, [wallet]);

    const handleWalletClick = () => {
        try {
            if (!wallet) {
                setVisible(true);
            } else {
                connect();
            }
            console.log(connect);
        } catch (error) {
            console.log("Error connecting to the wallet: ", (error as any).message);
        }
    };

    return (
        <button
            className="btn btn-primary btn-lg"
            onClick={handleWalletClick}
            disabled={connecting}
        >
            {publicKey ? <div>Use Wallet Address</div> : <div>Connect Wallet</div>}
        </button>
    );
};
