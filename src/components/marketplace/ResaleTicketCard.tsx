import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaShoppingCart, FaUserAlt, FaTags } from "react-icons/fa";
import { BuyResaleTicket } from "./BuyResaleTicket";
import { PriceComparison } from "./PriceComparison";

export interface ResaleTicket {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  ticketType: string;
  originalPrice: number;
  resalePrice: number;
  currency: string;
  listedDate: string;
  sellerAddress: string;
  sellerRating?: number;
  tokenId: string;
  originalOwner?: string;
  transferCount?: number;
}

interface ResaleTicketCardProps {
  ticket: ResaleTicket;
  onShowDetails?: (ticketId: string) => void;
}

export const ResaleTicketCard: React.FC<ResaleTicketCardProps> = ({
  ticket,
  onShowDetails,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShowDetails = () => {
    if (onShowDetails) {
      onShowDetails(ticket.id);
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="sm"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box 
          bg="lummy.purple.500"
          color="white" 
          py={1} 
          px={4} 
          borderBottomWidth="1px"
          borderBottomColor="lummy.purple.600"
        >
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FaTags} />
              <Text fontWeight="medium">Resale</Text>
            </HStack>
            {/* Badge removed as requested */}
          </Flex>
        </Box>

        <Box p={4} display="flex" flexDirection="column" flex="1">
          <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
            {ticket.eventName}
          </Text>

          <VStack mt={2} spacing={2} align="flex-start" color="gray.600">
            <HStack>
              <Icon as={FaCalendarAlt} size="sm" />
              <Text fontSize="sm" noOfLines={1} maxW="100%">
                {formatDate(ticket.eventDate)}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FaMapMarkerAlt} size="sm" />
              <Text fontSize="sm" noOfLines={1} maxW="100%">
                {ticket.eventLocation}
              </Text>
            </HStack>
          </VStack>

          <HStack mt={3}>
            <Icon as={FaTicketAlt} color="blue.500" />
            <Text fontSize="sm" fontWeight="medium">
              {ticket.ticketType}
            </Text>
          </HStack>

          <Divider my={3} />

          <PriceComparison
            originalPrice={ticket.originalPrice}
            resalePrice={ticket.resalePrice}
            currency={ticket.currency}
          />

          <HStack mt={3} spacing={2} fontSize="xs" color="gray.500">
            <Icon as={FaUserAlt} />
            <Text>
              Seller: {ticket.sellerAddress.substring(0, 6)}...
              {ticket.sellerAddress.substring(ticket.sellerAddress.length - 4)}
            </Text>
          </HStack>

          <Flex mt="auto" pt={4} justify="space-between">
            <Button
              size="sm"
              variant="outline"
              onClick={handleShowDetails}
            >
              View Details
            </Button>

            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<Icon as={FaShoppingCart} />}
              onClick={onOpen}
            >
              Buy Now
            </Button>
          </Flex>
        </Box>
      </Box>

      <BuyResaleTicket
        isOpen={isOpen}
        onClose={onClose}
        ticket={ticket}
      />
    </>
  );
};

export default ResaleTicketCard;