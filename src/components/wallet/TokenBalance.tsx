import React from 'react';
import { HStack, Text, Icon, Spinner } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';
import { useBalance, useAccount } from 'wagmi';

export const TokenBalance: React.FC = () => {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
    // You can add a specific token here if needed
    // token: '0x123...', // IDRX token address
  });

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  return (
    <HStack spacing={2} width="100%">
      <Icon as={FaCoins} color="blue.500" />
      <Text fontWeight="medium">Balance:</Text>
      <Text ml="auto">
        {balance ? `${parseFloat(balance.formatted).toLocaleString()} ${balance.symbol}` : '0'}
      </Text>
    </HStack>
  );
};

export default TokenBalance;