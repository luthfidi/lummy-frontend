import React, { useState } from "react";
import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Icon,
  Badge,
  Divider,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, CalendarIcon } from "@chakra-ui/icons";
import { FaTicketAlt, FaChartLine, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// SECTION 1: Uncomment to test importing the SalesStatistics component
import SalesStatistics from "../../components/admin/SalesStatistics";

// SECTION 2: Uncomment to test importing the EventStats component
import EventStats from "../../components/admin/EventStats";

// SECTION 3: Uncomment to test the mock data
// Mock data - would be fetched from API in real application

const mockEvents = [
  {
    eventId: "1",
    eventName: "Summer Music Festival",
    ticketsSold: 450,
    totalTickets: 500,
    revenue: 22500,
    currency: "IDRX",
    tierStats: [
      { tierName: "General Admission", sold: 300, total: 300, price: 50 },
      { tierName: "VIP Pass", sold: 120, total: 150, price: 100 },
      { tierName: "Backstage Experience", sold: 30, total: 50, price: 150 },
    ],
    daysUntilEvent: 45,
  },
  {
    eventId: "2",
    eventName: "Tech Conference 2025",
    ticketsSold: 280,
    totalTickets: 400,
    revenue: 42000,
    currency: "IDRX",
    tierStats: [
      { tierName: "Standard Access", sold: 200, total: 250, price: 150 },
      { tierName: "Premium Access", sold: 80, total: 150, price: 300 },
    ],
    daysUntilEvent: 120,
  },
  {
    eventId: "3",
    eventName: "Blockchain Workshop",
    ticketsSold: 75,
    totalTickets: 100,
    revenue: 7500,
    currency: "IDRX",
    tierStats: [
      { tierName: "Workshop Ticket", sold: 65, total: 80, price: 100 },
      { tierName: "Workshop + Certification", sold: 10, total: 20, price: 200 },
    ],
    daysUntilEvent: 15,
  },
];

// Mock sales data
const mockSalesData = {
  totalRevenue: 72000,
  soldTickets: 805,
  availableTickets: 195,
  totalTransactions: 610,
  averageTicketPrice: 89.44,
  revenueByTier: {
    "General Admission": 15000,
    "VIP Pass": 12000,
    "Backstage Experience": 4500,
    "Standard Access": 30000,
    "Premium Access": 24000,
    "Workshop Ticket": 6500,
    "Workshop + Certification": 2000,
  },
  salesByDay: [
    { date: "2025-03-01", sales: 20 },
    { date: "2025-03-02", sales: 35 },
    { date: "2025-03-03", sales: 42 },
    { date: "2025-03-04", sales: 28 },
    { date: "2025-03-05", sales: 15 },
    { date: "2025-03-06", sales: 30 },
    { date: "2025-03-07", sales: 25 },
  ],
  currency: "IDRX",
  percentChange: 12.5,
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  // SECTION 4: Uncomment to test state management
  const [selectedEvent, setSelectedEvent] = useState<string>("all");

  const cardBg = useColorModeValue("white", "gray.700");

  // SECTION 5: Uncomment to test filter function
  // Filter data based on selected event, or show all stats

  const filteredSalesData =
    selectedEvent === "all" ? mockSalesData : { ...mockSalesData }; // Would filter in real application

  const handleCreateEvent = () => {
    navigate("/admin/events/create");
  };

  const handleManageEvent = (eventId: string) => {
    navigate(`/admin/events/${eventId}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* SECTION 6: Header and Create Button - Should work fine */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg">Organizer Dashboard</Heading>
          <Text color="gray.600">Manage your events and track performance</Text>
        </Box>
        <Button
          colorScheme="purple"
          leftIcon={<AddIcon />}
          onClick={handleCreateEvent}
        >
          Create Event
        </Button>
      </Flex>

      {/* SECTION 7: Uncomment to test Tabs */}
      <Tabs colorScheme="purple" variant="enclosed" mb={8}>
        <TabList>
          <Tab>
            <Icon as={FaChartLine} mr={2} /> Overview
          </Tab>
          <Tab>
            <Icon as={FaTicketAlt} mr={2} /> My Events
          </Tab>
          <Tab>
            <Icon as={FaUsers} mr={2} /> Attendees
          </Tab>
        </TabList>

        <TabPanels>
          {/* SECTION 8: Uncomment to test Overview Tab */}
          <TabPanel px={0}>
            <Box mb={6}>
              <HStack mb={4} justify="space-between">
                <Heading size="md">Sales Overview</Heading>
                <Select
                  maxW="250px"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  <option value="all">All Events</option>
                  {mockEvents.map((event) => (
                    <option key={event.eventId} value={event.eventId}>
                      {event.eventName}
                    </option>
                  ))}
                </Select>
              </HStack>
              {/* SECTION 9: Uncomment to test SalesStatistics component */}

              {filteredSalesData && (
                <SalesStatistics
                  salesData={filteredSalesData}
                  eventName={
                    selectedEvent === "all"
                      ? "All Events"
                      : mockEvents.find((e) => e.eventId === selectedEvent)
                          ?.eventName || "Event"
                  }
                />
              )}
            </Box>

            <Divider my={8} />

            <Heading size="md" mb={4}>
              Upcoming Events
            </Heading>
            {/* SECTION 10: Uncomment to test EventStats grid */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {mockEvents
                .sort((a, b) => a.daysUntilEvent - b.daysUntilEvent)
                .slice(0, 4)
                .map((event) => (
                  <EventStats key={event.eventId} stats={event} />
                ))}
            </SimpleGrid>
          </TabPanel>

          {/* SECTION 11: Uncomment to test My Events Tab */}
          <TabPanel px={0}>
            <Heading size="md" mb={4}>
              All Events
            </Heading>
            <SimpleGrid columns={1} spacing={4}>
              {mockEvents.map((event) => (
                <Box
                  key={event.eventId}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg={cardBg}
                  shadow="sm"
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <HStack mb={1}>
                        <Heading size="md">{event.eventName}</Heading>
                        <Badge
                          colorScheme={
                            event.daysUntilEvent > 30
                              ? "green"
                              : event.daysUntilEvent > 7
                              ? "orange"
                              : "red"
                          }
                        >
                          {event.daysUntilEvent} days to go
                        </Badge>
                      </HStack>
                      <HStack spacing={4} color="gray.600">
                        <HStack>
                          <Icon as={FaTicketAlt} />
                          <Text>
                            {event.ticketsSold} / {event.totalTickets} sold
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon as={CalendarIcon} />
                          <Text>{new Date().toLocaleDateString()}</Text>
                        </HStack>
                      </HStack>
                    </Box>
                    <Button
                      colorScheme="purple"
                      onClick={() => handleManageEvent(event.eventId)}
                    >
                      Manage
                    </Button>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>

          {/* SECTION 12: Uncomment to test Attendees Tab */}
          <TabPanel px={0}>
            <Text fontSize="lg" fontWeight="medium" mb={4}>
              For attendee management, please select an event from the My Events
              tab.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
