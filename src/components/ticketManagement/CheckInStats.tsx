import React from 'react';
import {
  Box,
  Flex,
  Text,
  Progress,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUsers, FaUserCheck, FaPercentage, FaClock } from 'react-icons/fa';

interface CheckInStatsProps {
  eventId: string;
  stats: {
    totalAttendees: number;
    checkedIn: number;
    checkInRate: number;
    peakCheckInTime: string;
    recentActivity: number;
    tierStats: Array<{
      name: string;
      total: number;
      checkedIn: number;
    }>;
  };
}

const CheckInStats: React.FC<CheckInStatsProps> = ({ 
  eventId, 
  stats 
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          label="Total Attendees"
          value={stats.totalAttendees}
          icon={FaUsers}
          color="blue"
        />
        <StatCard
          label="Checked In"
          value={stats.checkedIn}