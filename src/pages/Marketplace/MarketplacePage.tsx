import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Divider,
  Flex,
  Icon,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTicketAlt, FaShoppingCart } from "react-icons/fa";
import {
  ResaleTicketCard,
  ResaleTicket,
} from "../../components/marketplace/ResaleTicketCard";
import {
  MarketplaceFilters,
  MarketplaceFiltersValue,
} from "../../components/marketplace/MarketplaceFilters";
import { BuyResaleTicket } from "../../components/marketplace/BuyResaleTicket";
import { mockEvents } from "../../data/mockEvents";

// Mock data for resale tickets
const mockResaleTickets: ResaleTicket[] = [
  {
    id: "resale-1",
    eventId: "1", // Match with mockEvents IDs
    eventName: "Summer Music Festival",
    eventDate: "2025-06-15T12:00:00",
    eventLocation: "Jakarta Convention Center",
    ticketType: "VIP Pass",
    originalPrice: 500,
    resalePrice: 450,
    currency: "IDRX",
    listedDate: "2025-05-10T14:23:45",
    sellerAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    sellerRating: 4.8,
    tokenId: "NFT-12345678",
    transferCount: 0,
  },
  {
    id: "resale-2",
    eventId: "2", // Match with mockEvents IDs
    eventName: "Tech Conference 2025",
    eventDate: "2025-07-25T09:00:00",
    eventLocation: "Digital Hub Bandung",
    ticketType: "Premium Access",
    originalPrice: 300,
    resalePrice: 320,
    currency: "IDRX",
    listedDate: "2025-06-05T09:12:33",
    sellerAddress: "0x1234567890abcdef1234567890abcdef12345678",
    sellerRating: 4.5,
    tokenId: "NFT-87654321",
    transferCount: 1,
  },
  {
    id: "resale-3",
    eventId: "1", // Match with mockEvents IDs
    eventName: "Summer Music Festival",
    eventDate: "2025-06-15T12:00:00",
    eventLocation: "Jakarta Convention Center",
    ticketType: "Weekend Pass",
    originalPrice: 450,
    resalePrice: 400,
    currency: "IDRX",
    listedDate: "2025-05-20T16:45:10",
    sellerAddress: "0x2345678901bcdef2345678901bcdef23456789",
    sellerRating: 5.0,
    tokenId: "NFT-23456789",
    transferCount: 0,
  },
  {
    id: "resale-4",
    eventId: "3", // Match with mockEvents IDs
    eventName: "Blockchain Workshop",
    eventDate: "2025-05-10T10:00:00",
    eventLocation: "Blockchain Center Jakarta",
    ticketType: "Workshop + Certification",
    originalPrice: 200,
    resalePrice: 250,
    currency: "IDRX",
    listedDate: "2025-04-25T11:34:22",
    sellerAddress: "0x3456789012cdef3456789012cdef3456789012",
    sellerRating: 4.2,
    tokenId: "NFT-34567890",
    transferCount: 2,
  },
  {
    id: "resale-5",
    eventId: "2", // Match with mockEvents IDs
    eventName: "Tech Conference 2025",
    eventDate: "2025-07-25T09:00:00",
    eventLocation: "Digital Hub Bandung",
    ticketType: "Standard Access",
    originalPrice: 150,
    resalePrice: 120,
    currency: "IDRX",
    listedDate: "2025-06-10T10:23:45",
    sellerAddress: "0x456789012345def456789012345def45678901",
    sellerRating: 4.7,
    tokenId: "NFT-45678901",
    transferCount: 1,
  },
  {
    id: "resale-6",
    eventId: "4", // Match with mockEvents IDs
    eventName: "Art Exhibition: Future Visions",
    eventDate: "2025-06-05T11:00:00",
    eventLocation: "Modern Gallery Surabaya",
    ticketType: "Premium Experience",
    originalPrice: 150,
    resalePrice: 175,
    currency: "IDRX",
    listedDate: "2025-05-15T14:12:09",
    sellerAddress: "0x56789012345def56789012345def5678901234",
    sellerRating: 4.9,
    tokenId: "NFT-56789012",
    transferCount: 0,
  },
];

// Add image URLs from mockEvents to resale tickets
const enrichTicketsWithImages = (tickets: ResaleTicket[]): ResaleTicket[] => {
  return tickets.map((ticket) => {
    const matchingEvent = mockEvents.find(
      (event) => event.id === ticket.eventId
    );
    if (matchingEvent) {
      return {
        ...ticket,
        imageUrl: matchingEvent.imageUrl,
      };
    }
    return ticket;
  });
};

export const MarketplacePage: React.FC = () => {
  const [resaleTickets, setResaleTickets] = useState<ResaleTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<ResaleTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<ResaleTicket | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories = ["Music", "Technology", "Workshop", "Art", "All"];
  const locations = ["Jakarta", "Bandung", "Surabaya", "All"];

  useEffect(() => {
    // Simulate API call to fetch resale tickets
    setTimeout(() => {
      const enrichedTickets = enrichTicketsWithImages(mockResaleTickets);
      setResaleTickets(enrichedTickets);
      setFilteredTickets(enrichedTickets);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleFilterChange = (filters: MarketplaceFiltersValue) => {
    let filtered = [...resaleTickets];

    // Apply search filter
    if (filters.search && filters.search.trim() !== "") {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.eventName.toLowerCase().includes(searchLower) ||
          ticket.ticketType.toLowerCase().includes(searchLower) ||
          ticket.eventLocation.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter((ticket) => {
        // Simplified category mapping for demo purposes
        const ticketCategory = ticket.eventName.includes("Music")
          ? "Music"
          : ticket.eventName.includes("Tech")
          ? "Technology"
          : ticket.eventName.includes("Workshop")
          ? "Workshop"
          : ticket.eventName.includes("Art")
          ? "Art"
          : "Other";

        return ticketCategory === filters.category;
      });
    }

    // Apply location filter
    if (filters.location && filters.location !== "All") {
      filtered = filtered.filter((ticket) =>
        ticket.eventLocation.includes(filters.location)
      );
    }

    // Apply date filter
    if (filters.date) {
      const filterDate = new Date(filters.date);
      filtered = filtered.filter((ticket) => {
        const eventDate = new Date(ticket.eventDate);
        return (
          eventDate.getFullYear() === filterDate.getFullYear() &&
          eventDate.getMonth() === filterDate.getMonth() &&
          eventDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.resalePrice - b.resalePrice);
        break;
      case "price_high":
        filtered.sort((a, b) => b.resalePrice - a.resalePrice);
        break;
      case "date_close":
        filtered.sort(
          (a, b) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
        break;
      case "best_deal":
        filtered.sort(
          (a, b) =>
            a.resalePrice / a.originalPrice - b.resalePrice / b.originalPrice
        );
        break;
      default: // newest
        filtered.sort(
          (a, b) =>
            new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
        );
        break;
    }

    setFilteredTickets(filtered);
  };

  const handleShowDetails = (ticketId: string) => {
    const ticket = resaleTickets.find((t) => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      onOpen();
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg">NFT Ticket Marketplace</Heading>
          <Text color="gray.600">
            Buy verified resale tickets for upcoming events
          </Text>
        </Box>

        <MarketplaceFilters
          onFilterChange={handleFilterChange}
          categories={categories}
          locations={locations}
        />

        <Divider />

        {isLoading ? (
          <Flex justify="center" align="center" py={12}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </Flex>
        ) : filteredTickets.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredTickets.map((ticket) => (
              <ResaleTicketCard
                key={ticket.id}
                ticket={ticket}
                onShowDetails={handleShowDetails}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Flex direction="column" align="center" justify="center" py={12}>
            <Icon as={FaTicketAlt} boxSize={16} color="gray.300" />
            <Text mt={4} fontSize="lg" fontWeight="medium" color="gray.500">
              No resale tickets found
            </Text>
            <Text color="gray.500">
              Try adjusting your filters or check back later
            </Text>
            <Button
              mt={4}
              leftIcon={<Icon as={FaShoppingCart} />}
              colorScheme="blue"
              onClick={() => setFilteredTickets(resaleTickets)}
            >
              Show All Tickets
            </Button>
          </Flex>
        )}
      </VStack>

      {selectedTicket && (
        <BuyResaleTicket
          isOpen={isOpen}
          onClose={onClose}
          ticket={selectedTicket}
        />
      )}
    </Container>
  );
};

export default MarketplacePage;
