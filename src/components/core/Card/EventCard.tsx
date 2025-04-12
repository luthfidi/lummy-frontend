// src/components/core/Card/EventCard.tsx
import React from 'react';
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import { Event } from '../../../types/Event';
import { Card } from './Card';

// Simple formatter for dates
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const { title, date, location, imageUrl, price, category, status, currency } = event;

  // Define status color mapping
  const statusColorMap = {
    available: 'green',
    limited: 'orange',
    soldout: 'red',
  };

  const statusColor = statusColorMap[status] || 'gray';

  return (
    <Card 
      isHoverable 
      onClick={onClick} 
      cursor="pointer" 
      overflow="hidden" 
      p={0} 
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative">
        <Image 
          src={imageUrl} 
          alt={title} 
          height="180px" 
          width="100%" 
          objectFit="cover" 
        />
        <Badge
          position="absolute"
          top="10px"
          right="10px"
          colorScheme={statusColor}
          variant="solid"
          fontSize="xs"
          textTransform="uppercase"
        >
          {status}
        </Badge>
      </Box>
      
      <VStack p={4} align="stretch" spacing={2} flex="1" justify="space-between">
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={1} lineHeight="1.4">
            {title}
          </Text>
          
          <Text fontSize="sm" color="gray.600" mb={2}>
            {formatDate(date)} • {location}
          </Text>
        </Box>
        
        <Spacer />
        
        <Flex justify="space-between" align="center" mt={2}>
          <Badge colorScheme="purple" variant="subtle">
            {category}
          </Badge>
          <Text fontWeight="bold" color="purple.600">
            {price} {currency}
          </Text>
        </Flex>
      </VStack>
    </Card>
  );
};

export default EventCard;