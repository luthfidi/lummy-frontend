import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Image,
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
      <Box
        bg="purple.500"
        color="white"
        py={20}
        backgroundImage="linear-gradient(to right, #A78BFA, #FF9EC3)"
      >
        <Container maxW="container.xl">
          <VStack spacing={6} align="flex-start">
            <Heading size="2xl" fontWeight="bold" color="white">
              Discover Events, <br /> Collect Memories
            </Heading>
            <Text fontSize="xl" maxW="2xl" color="white">
              Secure blockchain-powered tickets for the best events. No more
              fakes, no more hassles. Just unforgettable experiences.
            </Text>
            <InputGroup
              maxW="md"
              bg="white"
              borderRadius="full"
              overflow="hidden"
            >
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search events, artists, or venues"
                border="none"
                _focus={{ boxShadow: "none" }}
              />
              <Button
                borderRadius="full"
                bg="lummy.pink"
                color="lummy.dark"
                _hover={{ bg: "pink.200" }}
                mr={1}
                my={1}
              >
                Search
              </Button>
            </InputGroup>
          </VStack>
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
