import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

/**
 * @class
 * @ignore
 */
export default function Layout({ children }: Props) {
  /**
   * @class
   * @ignore
   */
  return (
    <Flex
      flexDirection="column"
      alignItems="end"
      justifyContent="center"
      bg="white"
      paddingRight="20%"
      paddingTop="1%"
      paddingBottom="1%"
    >
      {children}
    </Flex>
  )
}