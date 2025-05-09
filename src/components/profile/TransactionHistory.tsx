import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  Flex,
  Select,
  IconButton,
  Link,
  HStack,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

interface Transaction {
  id: string;
  date: string;
  type: "purchase" | "sale" | "transfer";
  eventName: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  txHash: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const bgColor = "white";
  const headerBg = "gray.50";

  // Filter transactions based on selected type
  const filteredTransactions = transactions.filter(
    (tx) => filter === "all" || tx.type === filter
  );

  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "purchase":
        return "Purchase";
      case "sale":
        return "Sale";
      case "transfer":
        return "Transfer";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "purchase":
        return "blue";
      case "sale":
        return "purple";
      case "transfer":
        return "teal";
      default:
        return "gray";
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      p={0}
    >
      <Flex p={4} justify="space-between" align="center" bg={headerBg}>
        <Text fontSize="xl" fontWeight="bold">
          Transaction History
        </Text>
        <Select
          width="180px"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1); // Reset to first page on filter change
          }}
        >
          <option value="all">All Transactions</option>
          <option value="purchase">Purchases</option>
          <option value="sale">Sales</option>
          <option value="transfer">Transfers</option>
        </Select>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Event</Th>
              <Th isNumeric>Amount</Th>
              <Th>Status</Th>
              <Th>Transaction Hash</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td whiteSpace="nowrap">{formatDate(tx.date)}</Td>
                  <Td>
                    <Badge colorScheme={getTypeColor(tx.type)}>
                      {getTypeLabel(tx.type)}
                    </Badge>
                  </Td>
                  <Td noOfLines={1} maxWidth="200px">
                    {tx.eventName}
                  </Td>
                  <Td isNumeric>
                    {tx.amount} {tx.currency}
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Text fontSize="xs" fontFamily="monospace">
                        {tx.txHash.substring(0, 8)}...
                        {tx.txHash.substring(tx.txHash.length - 6)}
                      </Text>
                      <Link
                        href={`https://explorer.lisk.com/tx/${tx.txHash}`}
                        isExternal
                      >
                        <ExternalLinkIcon mx="2px" />
                      </Link>
                    </HStack>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center" py={4}>
                  No transactions found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {totalPages > 1 && (
        <Flex p={4} justify="space-between" align="center">
          <Text fontSize="sm" color="gray.500">
            Showing {(page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, filteredTransactions.length)} of{" "}
            {filteredTransactions.length} transactions
          </Text>
          <HStack>
            <IconButton
              aria-label="Previous Page"
              icon={<ChevronLeftIcon />}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              size="sm"
            />
            <Text fontSize="sm">
              Page {page} of {totalPages}
            </Text>
            <IconButton
              aria-label="Next Page"
              icon={<ChevronRightIcon />}
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              size="sm"
            />
          </HStack>
        </Flex>
      )}
    </Box>
  );
};

export default TransactionHistory;
