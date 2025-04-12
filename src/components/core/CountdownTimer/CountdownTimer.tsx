import React, { useState, useEffect } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <HStack spacing={4} justifyContent="center" alignItems="center" py={2}>
      {timeUnits.map((unit, index) => (
        <VStack key={index} spacing={0}>
          <Box
            bg="purple.50"
            borderRadius="md"
            p={3}
            minW="65px"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="purple.100"
          >
            <Text fontWeight="bold" fontSize="xl" color="purple.500">
              {unit.value.toString().padStart(2, "0")}
            </Text>
          </Box>
          <Text fontSize="xs" color="gray.500" mt={1}>
            {unit.label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default CountdownTimer;
