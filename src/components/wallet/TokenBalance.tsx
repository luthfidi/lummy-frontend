import React from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Icon,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { FaCoins, FaSync } from "react-icons/fa";
import { useWallet } from "../../hooks/useWallet";

interface TokenBalanceProps {
  tokenType?: string;
  isCompact?: boolean;
  showRefresh?: boolean;
}

export const TokenBalance: React.FC<TokenBalanceProps> = ({
  tokenType = "IDRX",
  isCompact = false,
  showRefresh = true,
}) => {
  const { balance, refreshBalance, isConnected, isConnecting } = useWallet();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    await refreshBalance();
    setTimeout(() => setIsRefreshing(false), 500); // Minimum visual feedback time
  };

  if (!isConnected) {
    return null;
  }

  if (isConnecting) {
    return (
      <Flex align="center">
        <Spinner size="sm" color="gray.500" mr={2} />
        <Text fontSize="sm" color="gray.500">
          Loading balance...
        </Text>
      </Flex>
    );
  }

  const tokenBalance = balance[tokenType] || 0;

  return (
    <HStack spacing={2} align="center">
      {!isCompact && <Icon as={FaCoins} color="blue.500" />}

      <Text fontWeight="medium" fontSize={isCompact ? "sm" : "md"}>
        {tokenBalance.toLocaleString()} {tokenType}
      </Text>

      {showRefresh && (
        <Tooltip label="Refresh balance">
          <Box as="span" cursor="pointer" onClick={handleRefresh}>
            <Icon
              as={FaSync}
              color="gray.500"
              boxSize={3}
              animation={isRefreshing ? "spin 1s linear infinite" : undefined}
              _hover={{ color: "blue.500" }}
            />
          </Box>
        </Tooltip>
      )}
    </HStack>
  );
};

export default TokenBalance;
