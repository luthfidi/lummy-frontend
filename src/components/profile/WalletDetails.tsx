import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  Badge,
  Divider,
  Icon,
  useClipboard,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaWallet, FaCoins, FaExchangeAlt, FaTicketAlt } from "react-icons/fa";
import { useWallet } from "../../hooks/useWallet";
import { TokenBalance } from "../../components/wallet";

const WalletDetails: React.FC = () => {
  const { wallet, isConnected, formatAddress, hasEnoughBalance } = useWallet();
  const { hasCopied, onCopy } = useClipboard(wallet?.address || "");

  const bgColor = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.600");

  if (!isConnected || !wallet) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgColor}
        p={6}
      >
        <Flex direction="column" align="center" justify="center" py={10}>
          <Icon as={FaWallet} boxSize={12} color="gray.300" mb={4} />
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            No Wallet Connected
          </Text>
          <Text color="gray.500" mb={6} textAlign="center">
            Connect your Xellar wallet to view your balance and transaction
            history
          </Text>
          <Button colorScheme="purple">Connect Wallet</Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      p={6}
    >
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        Wallet Details
      </Text>

      <VStack spacing={6} align="stretch">
        <Flex
          bg={cardBg}
          p={4}
          borderRadius="md"
          justify="space-between"
          align="center"
        >
          <HStack>
            <Icon as={FaWallet} color="purple.500" />
            <Text fontWeight="medium">Wallet Address</Text>
          </HStack>
          <HStack>
            <Text fontFamily="monospace" fontSize="sm">
              {formatAddress(wallet.address, 6)}
            </Text>
            <Tooltip label={hasCopied ? "Copied!" : "Copy address"}>
              <Button
                size="xs"
                onClick={onCopy}
                variant="ghost"
                colorScheme="purple"
              >
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </Tooltip>
            <Tooltip label="View on explorer">
              <Button
                as="a"
                href={`https://explorer.lisk.com/address/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="ghost"
                colorScheme="purple"
              >
                <ExternalLinkIcon />
              </Button>
            </Tooltip>
          </HStack>
        </Flex>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={4}>
            Token Balances
          </Text>
          <VStack spacing={4} align="stretch">
            <Flex
              justify="space-between"
              align="center"
              bg="blue.50"
              p={4}
              borderRadius="md"
            >
              <HStack>
                <Icon as={FaCoins} color="blue.500" />
                <Text>IDRX Balance</Text>
              </HStack>
              <TokenBalance tokenType="IDRX" />
            </Flex>

            <Flex
              justify="space-between"
              align="center"
              bg={cardBg}
              p={4}
              borderRadius="md"
            >
              <HStack>
                <Icon as={FaCoins} color="gray.500" />
                <Text>LSK Balance</Text>
              </HStack>
              <TokenBalance tokenType="LSK" />
            </Flex>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={4}>
            Quick Actions
          </Text>
          <HStack spacing={4}>
            <Button
              leftIcon={<Icon as={FaExchangeAlt} />}
              colorScheme="purple"
              variant="outline"
            >
              Send Tokens
            </Button>
            <Button leftIcon={<Icon as={FaTicketAlt} />} colorScheme="purple">
              View My Tickets
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default WalletDetails;
