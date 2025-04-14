import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Divider,
  Flex,
  Badge,
  Icon,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FaWallet, FaCoins, FaNetworkWired } from 'react-icons/fa';
import { useWallet } from '../../hooks/useWallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { wallet, balance, disconnect } = useWallet();
  const { hasCopied, onCopy } = useClipboard(wallet?.address || '');

  if (!wallet) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wallet Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Flex
              bg="purple.50"
              p={4}
              borderRadius="md"
              justify="center"
              align="center"
              direction="column"
            >
              <Icon as={FaWallet} boxSize={10} color="purple.500" mb={2} />
              <Text fontWeight="bold" fontSize="lg">
                Xellar Wallet
              </Text>
              <Badge colorScheme="green" mt={1}>
                Connected
              </Badge>
            </Flex>

            <Box>
              <Text fontWeight="medium" fontSize="sm" color="gray.500" mb={2}>
                Wallet Address
              </Text>
              <Flex
                bg="gray.50"
                p={3}
                borderRadius="md"
                justify="space-between"
                align="center"
              >
                <Text
                  fontSize="sm"
                  fontFamily="monospace"
                  isTruncated
                  maxW="80%"
                >
                  {wallet.address}
                </Text>
                <HStack>
                  <Tooltip
                    label={hasCopied ? 'Copied!' : 'Copy address'}
                    closeOnClick={false}
                  >
                    <Box
                      as="button"
                      onClick={onCopy}
                      color="gray.500"
                      _hover={{ color: 'blue.500' }}
                    >
                      {hasCopied ? <CheckIcon /> : <CopyIcon />}
                    </Box>
                  </Tooltip>
                  <Tooltip label="View on explorer">
                    <Box
                      as="a"
                      href={`https://explorer.lisk.com/address/${wallet.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="gray.500"
                      _hover={{ color: 'blue.500' }}
                    >
                      <ExternalLinkIcon />
                    </Box>
                  </Tooltip>
                </HStack>
              </Flex>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="medium" fontSize="sm" color="gray.500" mb={2}>
                Balances
              </Text>
              <VStack spacing={3} align="stretch">
                <Flex
                  justify="space-between"
                  align="center"
                  bg="blue.50"
                  p={3}
                  borderRadius="md"
                >
                  <HStack>
                    <Icon as={FaCoins} color="blue.500" />
                    <Text fontWeight="medium">IDRX</Text>
                  </HStack>
                  <Text>{balance.IDRX.toLocaleString()}</Text>
                </Flex>

                <Flex
                  justify="space-between"
                  align="center"
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                >
                  <HStack>
                    <Icon as={FaCoins} color="gray.500" />
                    <Text fontWeight="medium">LSK</Text>
                  </HStack>
                  <Text>{balance.LSK.toLocaleString()}</Text>
                </Flex>
              </VStack>
            </Box>

            <Box>
              <Text fontWeight="medium" fontSize="sm" color="gray.500" mb={2}>
                Network
              </Text>
              <Flex
                justify="space-between"
                align="center"
                bg="gray.50"
                p={3}
                borderRadius="md"
              >
                <HStack>
                  <Icon as={FaNetworkWired} color="green.500" />
                  <Text>{wallet.network}</Text>
                </HStack>
                <Badge colorScheme="green">Connected</Badge>
              </Flex>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" variant="outline" onClick={() => {
              disconnect();
              onClose();
            }}>
              Disconnect
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;