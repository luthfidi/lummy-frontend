// src/components/layout/Navbar/Navbar.tsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Container,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// Define Navigation Links
const Links = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'My Tickets', path: '/tickets' },
];

const NavLink = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <Box
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'purple.100',
      color: 'purple.600',
    }}
  >
    {children}
  </Box>
);

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" px={4} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box as={RouterLink} to="/" fontWeight="bold" fontSize="xl" color="purple.500">
              <Text fontSize="2xl" fontWeight="extrabold" bgGradient="linear(to-r, purple.500, pink.400)" bgClip="text">
                Lummy
              </Text>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'outline'}
              colorScheme={'purple'}
              size={'sm'}
              mr={4}
              borderRadius="full"
            >
              Connect Wallet
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="pink.400"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontWeight="bold"
                >
                  U
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">My Profile</MenuItem>
                <MenuItem as={RouterLink} to="/tickets">My Tickets</MenuItem>
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Navbar;