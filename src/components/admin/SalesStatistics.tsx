import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
  Badge,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

export interface SalesData {
  totalRevenue: number;
  soldTickets: number;
  availableTickets: number;
  totalTransactions: number;
  averageTicketPrice: number;
  revenueByTier: { [tierName: string]: number };
  salesByDay: { date: string; sales: number }[];
  currency: string;
  percentChange: number;
}

interface SalesStatisticsProps {
  salesData: SalesData;
  eventName: string;
}

// Helper component for stat cards
interface StatCardProps {
  label: string;
  value: string;
  helpText?: string;
  isIncrease?: boolean;
  icon?: string;
  bgColor?: string;
}
const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  helpText,
  isIncrease,
  icon,
}) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const arrowColor = isIncrease ? "green.500" : "red.500";
  const arrowSymbol = isIncrease ? "↑" : "↓";

  return (
    <Box p={4} bg={cardBg} borderRadius="md" shadow="sm" aria-label={label}>
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="medium">{label}</Text>
        {icon && (
          <Box fontSize="xl" aria-hidden="true">
            {icon}
          </Box>
        )}
      </Flex>

      <MotionText
        fontSize="2xl"
        fontWeight="bold"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </MotionText>

      {helpText && (
        <Flex align="center" mt={1}>
          {isIncrease !== undefined && (
            <Text fontSize="md" color={arrowColor} fontWeight="bold" mr={1}>
              {arrowSymbol}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500">
            {helpText}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

const SalesStatistics: React.FC<SalesStatisticsProps> = ({
  salesData,
  eventName,
}) => {
  const [timeRange, setTimeRange] = useState<string>("7d");
  const cardBg = useColorModeValue("white", "gray.700");

  // In a real implementation, this would update the data based on time range
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // Would typically fetch new data here
  };

  const calculatePercentage = (sold: number, total: number): number => {
    return total > 0 ? (sold / total) * 100 : 0;
  };

  const renderSalesChart = () => {
    return (
      <Box height="300px" width="100%">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData.salesByDay}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value: string | number | Date) => {
                // Format tanggal menjadi dd/MM
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value: any) => [`${value} tickets`, "Sales"]}
              labelFormatter={(label: string | number | Date) => {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Ticket Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  // Defensively handle data
  if (!salesData) {
    return <Box>No sales data available</Box>;
  }

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Heading size="md">Sales Statistics - {eventName || "Event"}</Heading>
        <Select
          value={timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value)}
          width="120px"
          size="sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </Select>
      </Flex>

      <Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mt={4}>
          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            _hover={{
              borderColor: useColorModeValue("green.500", "green.300"),
              shadow: "lg",
            }}
            p={4}
            rounded="xl"
          >
            <StatCard
              label="Total Revenue"
              value={`${salesData.currency || "IDRX"} ${(
                salesData.totalRevenue || 0
              ).toLocaleString()}`}
              helpText={`${salesData.percentChange || 0}% from previous period`}
              isIncrease={(salesData.percentChange || 0) > 0}
              icon="💰"
              bgColor={useColorModeValue("green.50", "green.900")}
            />
          </MotionBox>

          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            _hover={{
              borderColor: useColorModeValue("green.500", "green.300"),
              shadow: "lg",
            }}
            p={4}
            rounded="xl"
          >
            <StatCard
              label="Tickets Sold"
              value={(salesData.soldTickets || 0).toLocaleString()}
              helpText={`${calculatePercentage(
                salesData.soldTickets || 0,
                (salesData.soldTickets || 0) + (salesData.availableTickets || 0)
              ).toFixed(1)}% of total`}
              icon="🎟️"
              bgColor={useColorModeValue("yellow.50", "yellow.900")}
            />
          </MotionBox>

          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            _hover={{
              borderColor: useColorModeValue("green.500", "green.300"),
              shadow: "lg",
            }}
            p={4}
            rounded="xl"
          >
            <StatCard
              label="Transactions"
              value={(salesData.totalTransactions || 0).toLocaleString()}
              helpText="Total purchases"
              icon="💳"
              bgColor={useColorModeValue("blue.50", "blue.900")}
            />
          </MotionBox>

          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            _hover={{
              borderColor: useColorModeValue("green.500", "green.300"),
              shadow: "lg",
            }}
            p={4}
            rounded="xl"
          >
            <StatCard
              label="Avg. Ticket Price"
              value={`${salesData.currency || "IDRX"} ${(
                salesData.averageTicketPrice || 0
              ).toLocaleString()}`}
              helpText="Per ticket"
              icon="📊"
              bgColor={useColorModeValue("purple.50", "purple.900")}
            />
          </MotionBox>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
  <MotionBox
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    border="2px solid"
    borderColor={useColorModeValue("gray.200", "gray.600")}
    _hover={{
      borderColor: useColorModeValue("green.500", "green.300"),
      shadow: "lg",
    }}
    p={4}
    rounded="xl"
  >
    <Box flex="1" shadow="sm" p={6}>
      <Heading size="sm" mb={4}>
        Sales Overview
      </Heading>
      <Box
        bg={cardBg}
        borderRadius="md"
        overflow="hidden"
        shadow="sm"
        p={4}
      >
        {renderSalesChart()}
      </Box>
    </Box>
  </MotionBox>

  <MotionBox
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    border="2px solid"
    borderColor={useColorModeValue("gray.200", "gray.600")}
    _hover={{
      borderColor: useColorModeValue("green.500", "green.300"),
      shadow: "lg",
    }}
    p={4}
    rounded="xl"
  >
    <Box flex="1" p={6}>
      <Heading size="sm" mb={4}>
        Revenue by Ticket Tier
      </Heading>
      <VStack spacing={3} align="stretch">
        {Object.entries(salesData.revenueByTier || {}).map(([tier, revenue]) => (
          <Flex key={tier} justify="space-between" align="center">
            <HStack>
              <Badge colorScheme="purple" px={2} py={1}>
                {tier}
              </Badge>
            </HStack>
            <Text fontWeight="bold">
              {salesData.currency || "IDRX"} {revenue.toLocaleString()}
            </Text>
          </Flex>
        ))}
        {Object.keys(salesData.revenueByTier || {}).length === 0 && (
          <Text color="gray.500">No revenue data available</Text>
        )}
      </VStack>
    </Box>
  </MotionBox>
</SimpleGrid>

      </Box>
    </Box>
  );
};

export default SalesStatistics;
