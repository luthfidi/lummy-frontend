import { Box, VStack, Text, Button, Heading, Divider } from "@chakra-ui/react";
import { ConnectButton } from "@xellar/kit";
import OrderSummary from "./OrderSummary"; // Import OrderSummary component
import { Event, TicketTier } from "../../types/Event"; // Import necessary types
import React from "react";

interface WalletConnectProps {
  onConnect: () => void;
  isLoading: boolean;
  isConnected?: boolean;
  walletAddress?: string;
  event?: Event; // Add event prop
  tier?: TicketTier; // Add tier prop
  quantity?: number; // Add quantity prop
  onQuantityChange?: (quantity: number) => void; // Add quantity change handler
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  isConnected = false,
  walletAddress,
  event,
  tier,
  quantity = 1,
  onQuantityChange = () => {},
}) => {
  const bgColor = "white";
  const borderColor = "gray.200";
  return (
    <VStack
      spacing={6}
      align="stretch"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      boxShadow="sm"
    >
      <Heading size="md">Connect Your Wallet</Heading>
      <Text color="gray.600">
        To purchase tickets on Lummy, you need to connect your Xellar Wallet
        which will be used for the IDRX payment and to store your ticket NFTs.
      </Text>

      <Box
        borderWidth="1px"
        borderRadius="md"
        borderColor={borderColor}
        p={4}
        bg={"lummy.purple.50"}
      >
        <VStack align="center" spacing={4}>
          <Box
            boxSize="80px"
            borderRadius="full"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="sm"
          >
            <Text fontSize="4xl">🔒</Text>
          </Box>
          <Text fontWeight="medium">Your NFT tickets are secure</Text>
          <Text fontSize="sm" textAlign="center" color="gray.600">
            NFT tickets cannot be counterfeited or duplicated, ensuring your
            tickets are authentic and valid for entry.
          </Text>
        </VStack>
      </Box>

      <Divider />

      <VStack align="stretch" spacing={4}>
        {/* Conditionally render OrderSummary when wallet is connected */}
        {isConnected && walletAddress && event && tier ? (
          <Box mt={4}>
            <OrderSummary
              event={event}
              tier={tier}
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />
          </Box>
        ) : (
          /* New to blockchain section */
          <Box mt={4} p={4} bg="gray.50" borderRadius="md">
            <VStack align="stretch" spacing={3}>
              <Text fontWeight="medium">New to blockchain?</Text>
              <Text fontSize="sm" color="gray.600">
                Don't have a wallet yet? No problem! Download the Xellar Wallet
                app to get started with crypto and NFT tickets.
              </Text>
              <ConnectButton.Custom>
                {({ openConnectModal, account, isConnected }) => {
                  const hasConnected = React.useRef(false);
                  if (isConnected && account && !hasConnected.current) {
                    hasConnected.current = true;
                    onConnect();
                  }

                  return (
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      px={4}
                      py={2}
                      borderRadius="lg"
                      onClick={openConnectModal}
                    >
                      Get Xellar Wallet
                    </Button>
                  );
                }}
              </ConnectButton.Custom>
            </VStack>
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default WalletConnect;
