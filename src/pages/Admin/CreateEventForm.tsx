import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  InputGroup,
  InputLeftElement,
  Divider,
  useToast,
  useColorModeValue,
  FormHelperText,
  SimpleGrid,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon, CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TicketTierCreator, {
  TicketTierInput,
} from "../../components/admin/TicketTierCreator";
import ResellSettings, {
  ResellSettingsData,
} from "../../components/admin/ResellSettings";

const CreateEventForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.700");

  // Form state
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    endTime: "",
    category: "",
    bannerImage: null as File | null,
    featuredImage: null as File | null,
  });

  // Ticket tiers state
  const [ticketTiers, setTicketTiers] = useState<TicketTierInput[]>([
    {
      id: "tier-1",
      name: "General Admission",
      description: "Standard festival access",
      price: 50,
      quantity: 300,
      maxPerPurchase: 4,
      benefits: [],
    },
  ]);

  // Resell settings state
  const [resellSettings, setResellSettings] = useState<ResellSettingsData>({
    allowResell: true,
    maxMarkupPercentage: 20,
    organizerFeePercentage: 2.5,
    restrictResellTiming: false,
    minDaysBeforeEvent: 1,
    requireVerification: false,
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: string | File | null) => {
    setEventData({
      ...eventData,
      [field]: value,
    });
  };

  // Handle file uploads
  const handleFileChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange(field, e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !eventData.title ||
      !eventData.date ||
      !eventData.time ||
      ticketTiers.length === 0
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Would handle actual form submission to API in real application
    toast({
      title: "Event created",
      description: "Your event has been created successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    console.log("Event Data:", eventData);
    console.log("Ticket Tiers:", ticketTiers);
    console.log("Resell Settings:", resellSettings);

    // Redirect to admin dashboard
    navigate("/admin");
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack>
          <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate("/admin")}
          />
          <Heading size="lg">Create New Event</Heading>
        </HStack>

        <Box as="form" onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* Left column - Event details */}
            <VStack spacing={6} align="stretch">
              <Box bg={cardBg} p={6} borderRadius="md" shadow="sm">
                <Heading size="md" mb={4}>
                  Event Details
                </Heading>

                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Event Title</FormLabel>
                    <Input
                      value={eventData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter event title"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={eventData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Describe your event"
                      rows={5}
                    />
                  </FormControl>

                  <SimpleGrid columns={2} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Category</FormLabel>
                      <Select
                        placeholder="Select category"
                        value={eventData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                      >
                        <option value="music">Music</option>
                        <option value="technology">Technology</option>
                        <option value="sport">Sport</option>
                        <option value="arts">Arts & Theater</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </VStack>
              </Box>

              <Box bg={cardBg} p={6} borderRadius="md" shadow="sm">
                <Heading size="md" mb={4}>
                  Location & Time
                </Heading>

                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Venue</FormLabel>
                    <Input
                      value={eventData.venue}
                      onChange={(e) =>
                        handleInputChange("venue", e.target.value)
                      }
                      placeholder="Enter venue name"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      value={eventData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Full venue address"
                      rows={2}
                    />
                  </FormControl>

                  <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Event Date</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <CalendarIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="date"
                          value={eventData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Start Time</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <TimeIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="time"
                          value={eventData.time}
                          onChange={(e) =>
                            handleInputChange("time", e.target.value)
                          }
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel>End Time</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <TimeIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="time"
                          value={eventData.endTime}
                          onChange={(e) =>
                            handleInputChange("endTime", e.target.value)
                          }
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>
                </VStack>
              </Box>

              <Box bg={cardBg} p={6} borderRadius="md" shadow="sm">
                <Heading size="md" mb={4}>
                  Event Images
                </Heading>

                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Banner Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange("bannerImage", e)}
                      p={1}
                    />
                    <FormHelperText>
                      Recommended size: 1200×400px
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Featured Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange("featuredImage", e)}
                      p={1}
                    />
                    <FormHelperText>Recommended size: 600×400px</FormHelperText>
                  </FormControl>
                </VStack>
              </Box>
            </VStack>

            {/* Right column - Ticket tiers and resell settings */}
            <VStack spacing={6} align="stretch">
              <Box bg={cardBg} p={6} borderRadius="md" shadow="sm">
                <TicketTierCreator
                  tiers={ticketTiers}
                  onChange={setTicketTiers}
                  currency="IDRX"
                />
              </Box>

              <Box bg={cardBg} p={6} borderRadius="md" shadow="sm">
                <ResellSettings
                  settings={resellSettings}
                  onSave={setResellSettings}
                />
              </Box>
            </VStack>
          </SimpleGrid>

          <Divider my={8} />

          <Flex justify="flex-end">
            <HStack spacing={4}>
              <Button variant="outline" onClick={() => navigate("/admin")}>
                Cancel
              </Button>
              <Button colorScheme="purple" type="submit">
                Create Event
              </Button>
            </HStack>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateEventForm;
