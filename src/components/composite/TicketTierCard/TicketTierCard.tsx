import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  Badge,
  List,
  ListItem,
  ListIcon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { TicketTier } from "../../../types/Event";

interface TicketTierCardProps {
  tier: TicketTier;
  onSelect: (tierId: string, quantity: number) => void;
}

export const TicketTierCard: React.FC<TicketTierCardProps> = ({
  tier,
  onSelect,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const isAvailable = tier.available > 0;

  const handleQuantityChange = (
    _valueAsString: string,
    valueAsNumber: number
  ) => {
    setQuantity(valueAsNumber);
  };

  const handleSelect = () => {
    onSelect(tier.id, quantity);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      bg="white"
      boxShadow="sm"
      position="relative"
      transition="all 0.3s"
      _hover={{
        boxShadow: "md",
        transform: isAvailable ? "translateY(-2px)" : "none",
      }}
    >
      {tier.available < 10 && tier.available > 0 && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="orange"
          variant="solid"
          fontSize="xs"
        >
          Only {tier.available} left
        </Badge>
      )}

      {tier.available === 0 && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="red"
          variant="solid"
          fontSize="xs"
        >
          Sold Out
        </Badge>
      )}

      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold" fontSize="lg">
          {tier.name}
        </Text>

        <Text fontWeight="bold" fontSize="2xl" color="purple.600">
          {tier.price} {tier.currency}
        </Text>

        <Text color="gray.600">{tier.description}</Text>

        {tier.benefits && tier.benefits.length > 0 && (
          <List spacing={2} mt={2}>
            {tier.benefits.map((benefit, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon as={CheckIcon} color="green.500" />
                <Text fontSize="sm">{benefit}</Text>
              </ListItem>
            ))}
          </List>
        )}

        <Flex justify="space-between" align="center" mt={4}>
          {isAvailable ? (
            <>
              <HStack spacing={2}>
                <Text fontSize="sm">Quantity:</Text>
                <NumberInput
                  size="sm"
                  maxW={20}
                  min={1}
                  max={Math.min(tier.maxPerPurchase, tier.available)}
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={handleSelect}
                isDisabled={!isAvailable}
              >
                Select
              </Button>
            </>
          ) : (
            <Button width="full" colorScheme="gray" isDisabled>
              Sold Out
            </Button>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};

export default TicketTierCard;
