// src/pages/EventDetail/EventDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  useToast,
  Flex,
  Badge,
  Avatar,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaInfoCircle,
  FaTicketAlt,
} from "react-icons/fa";
import { mockEvents } from "../../data/mockEvents";
import { Event } from "../../types/Event";

// This will be replaced with an actual API call in a real application
const fetchEventById = (id: string): Promise<Event | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.id === id);
      resolve(event);
    }, 500);
  });
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTier, setSelectedTier] = useState<{
    id: string;
    quantity: number;
  } | null>(null);
  const ticketSectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getEvent = async () => {
      if (id) {
        try {
          const eventData = await fetchEventById(id);
          setEvent(eventData || null);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching event:", error);
          toast({
            title: "Error loading event",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
        }
      }
    };

    getEvent();
  }, [id, toast]);

  const handleTierSelect = (tierId: string, quantity: number) => {
    setSelectedTier({ id: tierId, quantity });
  };

  const handleProceedToCheckout = () => {
    if (selectedTier) {
      navigate(`/checkout/${event?.id}`, {
        state: {
          tierId: selectedTier.id,
          quantity: selectedTier.quantity,
        },
      });
    } else {
      toast({
        title: "Please select a ticket tier",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4}>
          <Text>Loading event details...</Text>
        </VStack>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4}>
          <Heading>Event Not Found</Heading>
          <Text>
            Sorry, the event you're looking for doesn't exist or has been
            removed.
          </Text>
          <Button colorScheme="purple" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section with Event Banner */}
      <Box position="relative" height="400px" overflow="hidden">
        <Image
          src={event.bannerUrl || event.imageUrl}
          alt={event.title}
          width="100%"
          height="100%"
          objectFit="cover"
          filter="brightness(0.8)"
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)"
          p={8}
          color="white"
        >
          <Container maxW="container.xl">
            <VStack align="flex-start" spacing={2}>
              <Heading size="xl">{event.title}</Heading>
              <Text fontSize="lg">{event.venue || event.location}</Text>
            </VStack>
          </Container>
        </Box>
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* Social Share Section - Added based on reference */}
        <Flex direction={{ base: "column", md: "row" }} mb={6}>
          <Box w={{ base: "100%", md: "70%" }} pr={{ md: 8 }}>
            {/* Event Info - Similar to reference layout */}
            <HStack spacing={4} mb={6}>
              <Icon as={FaMapMarkerAlt} color="lummy.purple.500" />
              <Text>{event.venue || event.location}</Text>
            </HStack>

            <HStack spacing={4} mb={6}>
              <Icon as={FaCalendarAlt} color="lummy.purple.500" />
              <Text>
                {formatDate(event.date)} • {event.time}{" "}
                {event.endTime ? `- ${event.endTime}` : ""}
              </Text>
            </HStack>

            {/* Event Description - Clean layout */}
            <Box mb={8}>
              <Text fontSize="lg" lineHeight="tall">
                {event.longDescription || event.description}
              </Text>
            </Box>
          </Box>

          {/* Ticket Info Card - Similar to reference */}
          <Box
            w={{ base: "100%", md: "25%" }}
            borderWidth="1px"
            borderColor="gray.100"
            borderRadius="xl"
            px={8}
            py={14}
            bgGradient="linear(to-br, white, gray.50)"
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
          >
            <VStack spacing={5} align="stretch">
              <Text
                fontSize="sm"
                fontWeight="medium"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                From
              </Text>
              <Heading size="xl" color="lummy.gray.800" fontWeight="extrabold">
                {event.currency} {event.price.toLocaleString()}
              </Heading>
              <Button
                bgGradient="linear(to-r, purple.500, purple.400)"
                color="white"
                size="lg"
                width="100%"
                _hover={{ bgGradient: "linear(to-r, purple.600, purple.500)" }}
                onClick={() => {
                  if (event.ticketTiers && event.ticketTiers.length > 0) {
                    ticketSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });

                    if (selectedTier) {
                      handleProceedToCheckout();
                    }
                  }
                }}
              >
                🎟️ Buy Tickets
              </Button>
            </VStack>
          </Box>
        </Flex>

        {/* Event Information Section */}
        <Box my={10}>
          <Heading
            size="md"
            mb={6}
            pb={2}
            borderBottomWidth="1px"
            borderColor="gray.200"
          >
            Event Information
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Duration */}
            <HStack spacing={4} align="start">
              <Box
                p={2}
                bg="lummy.purple.50"
                borderRadius="full"
                color="lummy.purple.500"
              >
                <Icon as={FaClock} boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="medium" mb={1}>
                  Duration
                </Text>
                <Text color="gray.600">
                  {event.time} {event.endTime ? `- ${event.endTime}` : ""}
                  {/* Calculate duration if start and end times are available */}
                </Text>
              </Box>
            </HStack>

            {/* Audience */}
            <HStack spacing={4} align="start">
              <Box
                p={2}
                bg="lummy.blue.50"
                borderRadius="full"
                color="lummy.blue.500"
              >
                <Icon as={FaUsers} boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="medium" mb={1}>
                  Audience
                </Text>
                <Text color="gray.600">Suitable for all ages</Text>
              </Box>
            </HStack>

            {/* Special Notes */}
            <HStack spacing={4} align="start">
              <Box
                p={2}
                bg="lummy.pink.50"
                borderRadius="full"
                color="lummy.pink.500"
              >
                <Icon as={FaInfoCircle} boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="medium" mb={1}>
                  Important Info
                </Text>
                <Text color="gray.600">Digital ticket via blockchain.</Text>
              </Box>
            </HStack>
          </SimpleGrid>
        </Box>

        {/* Ticket Selection - Clean and Organized */}
        <Box my={10} ref={ticketSectionRef}>
          <Heading
            size="md"
            mb={6}
            pb={2}
            borderBottomWidth="1px"
            borderColor="gray.200"
          >
            Select Tickets
          </Heading>

          {event.ticketTiers && event.ticketTiers.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {event.ticketTiers.map((tier) => (
                <Box
                  key={tier.id}
                  borderWidth="1px"
                  borderColor={
                    selectedTier?.id === tier.id
                      ? "lummy.purple.300"
                      : "gray.200"
                  }
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  boxShadow={
                    selectedTier?.id === tier.id
                      ? "0 0 0 2px rgba(138, 110, 247, 0.3)"
                      : "sm"
                  }
                  transition="all 0.3s ease"
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                  position="relative"
                >
                  {/* Status Badge */}
                  {tier.available < 10 && tier.available > 0 && (
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme="orange"
                      variant="solid"
                      borderRadius="md"
                      px={2}
                      py={1}
                      fontSize="xs"
                    >
                      Only {tier.available} left
                    </Badge>
                  )}

                  {/* Tier Header */}
                  <Box
                    bg={
                      selectedTier?.id === tier.id
                        ? "lummy.purple.100"
                        : "gray.50"
                    }
                    p={4}
                    borderBottomWidth="1px"
                    borderColor={
                      selectedTier?.id === tier.id
                        ? "lummy.purple.200"
                        : "gray.200"
                    }
                  >
                    <Flex justify="space-between" align="center">
                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        color={
                          selectedTier?.id === tier.id
                            ? "lummy.purple.700"
                            : "gray.800"
                        }
                      >
                        {tier.name}
                      </Text>
                      <Text
                        fontWeight="bold"
                        fontSize="xl"
                        color="lummy.purple.600"
                      >
                        {tier.currency} {tier.price.toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>

                  {/* Tier Content */}
                  <Box p={4}>
                    <Text color="gray.600" mb={4}>
                      {tier.description}
                    </Text>

                    {/* Benefits List */}
                    {tier.benefits && tier.benefits.length > 0 && (
                      <VStack align="start" spacing={2} mb={4}>
                        {tier.benefits.map((benefit, idx) => (
                          <HStack key={idx} spacing={2} align="start">
                            <Icon
                              as={CheckIcon}
                              color="green.500"
                              mt={1}
                              boxSize={3}
                            />
                            <Text fontSize="sm" color="gray.700">
                              {benefit}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    )}

                    {/* Selection Controls */}
                    {tier.available > 0 ? (
                      <Flex justify="space-between" align="center" mt={4}>
                        <HStack spacing={2}>
                          <Text fontSize="sm" color="gray.600">
                            Qty:
                          </Text>
                          <NumberInput
                            size="sm"
                            maxW={16}
                            min={1}
                            max={Math.min(tier.maxPerPurchase, tier.available)}
                            value={
                              selectedTier?.id === tier.id
                                ? selectedTier.quantity
                                : 1
                            }
                            onChange={(_, val) => {
                              if (tier.id === selectedTier?.id) {
                                setSelectedTier({ id: tier.id, quantity: val });
                              }
                            }}
                          >
                            <NumberInputField borderRadius="md" bg="white" />
                            <NumberInputStepper bg="gray.100">
                              <NumberIncrementStepper
                                borderColor="gray.300"
                                color="gray.800"
                              />
                              <NumberDecrementStepper
                                borderColor="gray.300"
                                color="gray.800"
                              />
                            </NumberInputStepper>
                          </NumberInput>
                        </HStack>

                        <Button
                          colorScheme={
                            selectedTier?.id === tier.id ? "purple" : "gray"
                          }
                          size="sm"
                          onClick={() =>
                            handleTierSelect(
                              tier.id,
                              selectedTier?.id === tier.id
                                ? selectedTier.quantity
                                : 1
                            )
                          }
                          leftIcon={
                            selectedTier?.id === tier.id ? (
                              <CheckIcon />
                            ) : undefined
                          }
                          px={4}
                        >
                          {selectedTier?.id === tier.id ? "Selected" : "Select"}
                        </Button>
                      </Flex>
                    ) : (
                      <Button
                        width="100%"
                        isDisabled
                        size="sm"
                        colorScheme="gray"
                        mt={4}
                      >
                        Sold Out
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Box p={4} bg="gray.50" borderRadius="md">
              <Text>No ticket tiers available for this event.</Text>
            </Box>
          )}

          {/* Proceed to Checkout Button */}
          {selectedTier && (
            <Flex justify="center" mt={8}>
              <Button
                size="lg"
                colorScheme="purple"
                onClick={handleProceedToCheckout}
                leftIcon={<Icon as={FaTicketAlt} />}
                boxShadow="md"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                px={8}
              >
                Proceed to Checkout
              </Button>
            </Flex>
          )}
        </Box>

        {/* Terms & Conditions Accordion - Similar to reference */}
        <Box my={10}>
          <Accordion allowToggle>
            <AccordionItem
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
            >
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  Terms & Conditions
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>1. All tickets are NFTs on the Lisk blockchain.</Text>
                <Text mt={2}>
                  2. Tickets are subject to availability and are non-refundable
                  except in case of event cancellation.
                </Text>
                <Text mt={2}>
                  3. Tickets can be transferred to other users through the Lummy
                  platform.
                </Text>
                <Text mt={2}>
                  4. Resale of tickets is allowed only through the official
                  Lummy marketplace, with price caps set by event organizers.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        {/* Organizer Information */}
        <Box my={10}>
          <Heading
            size="md"
            mb={6}
            pb={2}
            borderBottomWidth="1px"
            borderColor="gray.200"
          >
            Organizer
          </Heading>

          <HStack spacing={4} align="center">
            <Avatar
              src={event.organizer.imageUrl || ""}
              name={event.organizer.name}
              size="lg"
              bg="lummy.purple.500"
            />
            <Box>
              <HStack>
                <Text fontWeight="bold" fontSize="lg">
                  {event.organizer.name}
                </Text>
                {event.organizer.verified && (
                  <Badge colorScheme="green" variant="subtle">
                    <HStack spacing={1}>
                      <CheckCircleIcon />
                      <Text fontSize="xs">Verified</Text>
                    </HStack>
                  </Badge>
                )}
              </HStack>
              {event.organizer.description && (
                <Text color="gray.600" mt={1}>
                  {event.organizer.description}
                </Text>
              )}
            </Box>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetailPage;
