import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Skeleton,
  Badge,
  Flex,
  IconButton,
  Divider,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Icon,
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { FaTicketAlt, FaChartBar, FaUsers, FaCog } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SalesStatistics, {
  SalesData,
} from "../../components/admin/SalesStatistics";
import EventStats, { EventStatsData } from "../../components/admin/EventStats";
import ResellSettings, {
  ResellSettingsData,
} from "../../components/admin/ResellSettings";
import AttendeeList, { Attendee } from "../../components/admin/AttendeeList";

// Mock event data - would be fetched from API in real application
const mockEvent: EventStatsData = {
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
};

// Mock sales data
const mockSalesData: SalesData = {
  totalRevenue: 22500,
  soldTickets: 450,
  availableTickets: 50,
  totalTransactions: 380,
  averageTicketPrice: 50,
  revenueByTier: {
    "General Admission": 15000,
    "VIP Pass": 12000,
    "Backstage Experience": 4500,
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

// Mock attendees data
const mockAttendees: Attendee[] = Array.from({ length: 30 }, (_, i) => ({
  id: `att-${i + 1}`,
  name: `Attendee ${i + 1}`,
  email: `attendee${i + 1}@example.com`,
  ticketType:
    i % 3 === 0
      ? "General Admission"
      : i % 3 === 1
      ? "VIP Pass"
      : "Backstage Experience",
  purchaseDate: new Date(2025, 2, Math.floor(i / 6) + 1).toISOString(),
  status:
    i % 10 === 0
      ? "checked-in"
      : i % 15 === 0
      ? "cancelled"
      : i % 20 === 0
      ? "refunded"
      : "confirmed",
  walletAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
}));

// Mock resell settings
const mockResellSettings: ResellSettingsData = {
  allowResell: true,
  maxMarkupPercentage: 20,
  organizerFeePercentage: 2.5,
  restrictResellTiming: false,
  minDaysBeforeEvent: 1,
  requireVerification: false,
};

const EventManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null!);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventStatsData | null>(null);
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [resellSettings, setResellSettings] =
    useState<ResellSettingsData | null>(null);

  // Fetch event data on mount
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API calls
      setTimeout(() => {
        setEvent(mockEvent);
        setSalesData(mockSalesData);
        setAttendees(mockAttendees);
        setResellSettings(mockResellSettings);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [id]);

  // Handle check-in
  const handleCheckIn = (attendeeId: string) => {
    setAttendees(
      attendees.map((att) =>
        att.id === attendeeId ? { ...att, status: "checked-in" } : att
      )
    );

    toast({
      title: "Attendee checked in",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle export
  const handleExport = () => {
    toast({
      title: "Exporting attendees",
      description: "Attendee list is being exported to CSV",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle resell settings update
  const handleResellSettingsUpdate = (settings: ResellSettingsData) => {
    setResellSettings(settings);

    toast({
      title: "Settings updated",
      description: "Resale settings have been successfully updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle event cancellation
  const handleCancelEvent = () => {
    onClose();

    toast({
      title: "Event cancelled",
      description: "The event has been cancelled successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/admin");
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <HStack mb={6}>
          <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate("/admin")}
          />
          <Skeleton height="40px" width="300px" />
        </HStack>

        <Skeleton height="200px" my={6} />
        <Skeleton height="400px" />
      </Container>
    );
  }

  if (!event || !salesData || !resellSettings) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Event not found</Text>
        <Button mt={4} onClick={() => navigate("/admin")}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <HStack mb={2}>
        <IconButton
          aria-label="Go back"
          icon={<ArrowBackIcon />}
          variant="ghost"
          onClick={() => navigate("/admin")}
        />
        <Heading size="lg">Manage Event</Heading>
      </HStack>

      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="xl">{event.eventName}</Heading>
          <HStack>
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
            <Text color="gray.600">
              Tickets: {event.ticketsSold} / {event.totalTickets} sold
            </Text>
          </HStack>
        </Box>

        <HStack>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="purple"
            variant="outline"
            onClick={() => navigate(`/admin/events/${id}/edit`)}
          >
            Edit Event
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            variant="outline"
            onClick={onOpen}
          >
            Cancel Event
          </Button>
        </HStack>
      </Flex>

      <Tabs colorScheme="purple" variant="enclosed">
        <TabList>
          <Tab>
            <Icon as={FaChartBar} mr={2} /> Analytics
          </Tab>
          <Tab>
            <Icon as={FaTicketAlt} mr={2} /> Tickets
          </Tab>
          <Tab>
            <Icon as={FaUsers} mr={2} /> Attendees
          </Tab>
          <Tab>
            <Icon as={FaCog} mr={2} /> Settings
          </Tab>
        </TabList>

        <TabPanels>
          {/* Analytics Tab */}
          <TabPanel px={0}>
            <VStack spacing={8} align="stretch">
              <SalesStatistics
                salesData={salesData}
                eventName={event.eventName}
              />

              <Divider />

              <Box>
                <Heading size="md" mb={4}>
                  Ticket Sales Performance
                </Heading>
                <EventStats stats={event} />
              </Box>
            </VStack>
          </TabPanel>

          {/* Tickets Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Ticket Tiers</Heading>

              {event.tierStats.map((tier, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  shadow="sm"
                >
                  <Flex justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">{tier.tierName}</Text>
                      <HStack>
                        <Badge colorScheme="purple">
                          {tier.price} {event.currency}
                        </Badge>
                        <Text fontSize="sm">
                          {tier.sold} / {tier.total} sold (
                          {((tier.sold / tier.total) * 100).toFixed(0)}%)
                        </Text>
                      </HStack>
                    </VStack>

                    <HStack>
                      <Button size="sm" colorScheme="purple" variant="outline">
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="purple"
                        variant="ghost"
                        isDisabled={tier.sold >= tier.total}
                      >
                        Add Tickets
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              ))}

              <Button leftIcon={<AddIcon />} alignSelf="flex-start">
                Add New Tier
              </Button>
            </VStack>
          </TabPanel>

          {/* Attendees Tab */}
          <TabPanel px={0}>
            <AttendeeList
              attendees={attendees}
              onCheckIn={handleCheckIn}
              onExport={handleExport}
            />
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel px={0}>
            <VStack spacing={8} align="stretch">
              <ResellSettings
                settings={resellSettings}
                onSave={handleResellSettingsUpdate}
              />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Cancel Event Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will cancel the event and notify all ticket
              holders. This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No, Keep Event
              </Button>
              <Button colorScheme="red" onClick={handleCancelEvent} ml={3}>
                Yes, Cancel Event
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default EventManagement;
