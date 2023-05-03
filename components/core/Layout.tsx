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
      background="E4F7FC"
      margin="15px"
    >
      {children}
    </Flex>
  )
}