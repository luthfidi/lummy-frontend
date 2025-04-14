import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { EventCard } from "../../components/core/Card";
import { mockEvents } from "../../data/mockEvents";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="white" py={10}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={8}
          >
            <VStack spacing={6} align="flex-start" maxW={{ md: "550px" }}>
              <Heading
                size="2xl"
                fontWeight="bold"
                lineHeight="1.2"
                bgGradient="linear(to-r, lummy.purple.600, lummy.pink.500)"
                bgClip="text"
              >
                Discover Events, Collect Memories
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Secure blockchain-powered tickets for the best events. No more
                fakes, no more hassles. Just unforgettable experiences.
              </Text>
              <Box w="100%">
                <InputGroup
                  size="lg"
                  boxShadow="sm"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search events, artists, or venues"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "lummy.purple.400",
                      boxShadow: "0 0 0 1px #A48BFA",
                    }}
                    bg="white"
                  />
                  <InputRightElement width="auto">
                    <Button
                      h="100%"
                      size="md"
                      borderLeftRadius="0"
                      colorScheme="purple"
                    >
                      Search
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </VStack>

            <Box
              display={{ base: "none", md: "block" }}
              w={{ md: "400px", lg: "500px" }}
              h={{ md: "300px", lg: "350px" }}
              position="relative"
            >
              {/* This would be a hero illustration or image */}
              <Box
                w="full"
                h="full"
                bg="lummy.purple.100"
                borderRadius="md"
                position="relative"
                overflow="hidden"
              >
                <Text textAlign="center" pt="40%">
                  Lummy Mascot Image Placeholder
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Featured Events Section */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading size="lg" fontWeight="bold">
              Featured Events
            </Heading>
            <Button variant="outline" colorScheme="purple">
              View All
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event.id)}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Categories Section */}
      <Box bg="gray.50" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading size="lg" fontWeight="bold">
              Browse by Category
            </Heading>

            <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
              {["Music", "Technology", "Sports", "Art", "Workshop", "Food"].map(
                (category) => (
                  <VStack
                    key={category}
                    bg="white"
                    p={4}
                    borderRadius="xl"
                    boxShadow="base"
                    cursor="pointer"
                    _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
                  >
                    {/* Replace with actual icons for each category */}
                    <Box
                      w="60px"
                      h="60px"
                      borderRadius="full"
                      bg="lummy.blue"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="2xl">🎵</Text>
                    </Box>
                    <Text fontWeight="medium">{category}</Text>
                  </VStack>
                )
              )}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Upcoming Events Section */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading size="lg" fontWeight="bold">
              Upcoming Events
            </Heading>
            <Button variant="outline" colorScheme="purple">
              View All
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event.id)}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Why Choose Lummy Section */}
      <Box bg="lummy.gray" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="center" textAlign="center">
            <Heading size="lg" fontWeight="bold">
              Why Choose Lummy?
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <VStack>
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="lummy.pink"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  <Text fontSize="3xl">🔒</Text>
                </Box>
                <Heading size="md">Secure & Transparent</Heading>
                <Text>
                  Blockchain-powered tickets that can't be faked or duplicated.
                </Text>
              </VStack>

              <VStack>
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="lummy.purple"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  <Text fontSize="3xl">💸</Text>
                </Box>
                <Heading size="md">Fair Reselling</Heading>
                <Text>
                  Sell tickets you can't use at a fair price without scalping.
                </Text>
              </VStack>

              <VStack>
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="lummy.mint"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  <Text fontSize="3xl">⚡</Text>
                </Box>
                <Heading size="md">Instant Transfer</Heading>
                <Text>
                  Send tickets to friends instantly with just a few clicks.
                </Text>
              </VStack>
            </SimpleGrid>

            <Button
              size="lg"
              bg="lummy.purple"
              color="white"
              _hover={{ bg: "purple.500" }}
              borderRadius="full"
              px={8}
            >
              Learn More
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
