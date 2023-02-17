import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { HugsApi } from "../../../services/hugsApi";

import styles from "../../../pages/homePage.module.css";

type Props = {
  handleOpenModal: any;
};

/**
 * @class
 * @ignore 
 */
export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  /**
   * @class
   * @ignore
   */
  function handleConnectWallet() {
    activateBrowserWallet();
    new HugsApi().createToken();
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="linear-gradient(157.59deg, #4DCAFA 6.59%, #2F7994 74.48%)"
      borderRadius="xl"
      py="0"
      max-width="150px"
    >
      <Box 
        px="3"
        max-width="150px"
      >
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        max-width="150px"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          backgroundColor: "linear-gradient(157.59deg, #4DCAFA 6.59%, #2F7994 74.48%)",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2" max-width="150px">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
      </Button>
    </Box>
  ) : (
    <button 
      className={styles.walletLoginButton}
      onClick={handleConnectWallet}>
        Connect to a wallet
    </button>
  );
}