import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Container,
  Text,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, RepeatIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@xellar/kit";
import { Address, erc20Abi, formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { IDRX_SEPOLIA } from "../../../constants";
import { truncateAddress } from "../../../utils/string";

// Kalo mau pake wallet nanti uncomment ini
// import { useWallet } from "../../../hooks/useWallet";

// Navigation links
const Links = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "My Tickets", path: "/tickets" },
  { name: "Admin", path: "/admin" },
  { name: "Profile", path: "/profile" },
];

// Individual navigation item
const NavLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => (
  <Box
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded="md"
    _hover={{ textDecoration: "none", bg: "purple.100", color: "purple.600" }}
  >
    {children}
  </Box>
);

// Connected wallet button
const ConnectedButton: React.FC<{ address: Address; onClick: () => void }> = ({
  address,
  onClick,
}) => {
  const { data } = useReadContract({
    address: IDRX_SEPOLIA,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  const formatted = formatUnits(data ?? BigInt(0), 2);

  return (
    <Button
      bg="purple.500"
      color="white"
      px={4}
      py={2}
      borderRadius="lg"
      onClick={onClick}
    >
      {truncateAddress(address)} - {Number(formatted).toLocaleString()} IDRX
    </Button>
  );
};

// Navbar Component with added props
interface NavbarProps {
  isCompact?: boolean;
  showRefresh?: boolean;
  onRefresh?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isCompact = false,
  showRefresh = false,
  onRefresh = () => console.log("Refreshing data..."),
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Removed unused variable: const { isConnected: walletIsConnected } = useWallet();

  return (
    <Box bg="white" px={4} boxShadow="sm" py={isCompact ? 1 : 2}>
      <Container maxW="container.xl">
        <Flex
          h={isCompact ? "48px" : "64px"}
          align="center"
          justify="space-between"
        >
          {/* Mobile Menu Button */}
          <IconButton
            size={isCompact ? "sm" : "md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Navigation"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          {/* Logo & Desktop Nav */}
          <HStack spacing={isCompact ? 4 : 8} align="center">
            <Box as={RouterLink} to="/">
              <Text
                fontSize={isCompact ? "xl" : "2xl"}
                fontWeight="extrabold"
                bgGradient="linear(to-r, purple.500, pink.400)"
                bgClip="text"
              >
                Lummy
              </Text>
            </Box>

            <HStack
              as="nav"
              spacing={isCompact ? 2 : 4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          {/* Actions Area - Refresh + Connect Wallet Button */}
          <Flex align="center" gap={2}>
            {showRefresh && (
              <Tooltip label="Refresh data">
                <IconButton
                  aria-label="Refresh"
                  icon={<RepeatIcon />}
                  size={isCompact ? "sm" : "md"}
                  variant="ghost"
                  colorScheme="purple"
                  onClick={onRefresh}
                />
              </Tooltip>
            )}

            <ConnectButton.Custom>
              {({
                openConnectModal,
                isConnected,
                openProfileModal,
                account,
              }) => {
                if (!isConnected) {
                  return (
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      size={isCompact ? "sm" : "md"}
                      px={4}
                      py={isCompact ? 1 : 2}
                      borderRadius="lg"
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                return (
                  <ConnectedButton
                    address={account?.address as Address}
                    onClick={openProfileModal}
                  />
                );
              }}
            </ConnectButton.Custom>
          </Flex>
        </Flex>

        {/* Mobile Navigation */}
        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
