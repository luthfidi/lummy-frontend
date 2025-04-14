import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  Text,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaWallet,
  FaSignOutAlt,
  FaExchangeAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useWallet } from "../../hooks/useWallet";
import { TokenBalance } from "./TokenBalance";
import { WalletModal } from "./WalletModal";

interface WalletButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
  colorScheme?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  size = "md",
  variant = "outline",
  colorScheme = "purple",
}) => {
  const { isConnected, wallet, disconnect, formatAddress } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDisconnect = async () => {
    await disconnect();
  };

  if (!isConnected || !wallet) {
    return null;
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          leftIcon={<Icon as={FaWallet} />}
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          borderRadius="full"
        >
          <HStack spacing={2}>
            <Text>{formatAddress(wallet.address)}</Text>
          </HStack>
        </MenuButton>
        <MenuList>
          <HStack px={3} py={2}>
            <TokenBalance />
          </HStack>
          <MenuDivider />
          <MenuItem onClick={onOpen} icon={<Icon as={FaUserCircle} />}>
            Wallet Details
          </MenuItem>
          <MenuItem icon={<Icon as={FaExchangeAlt} />}>
            Transaction History
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={handleDisconnect}
            icon={<Icon as={FaSignOutAlt} />}
          >
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>

      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default WalletButton;
