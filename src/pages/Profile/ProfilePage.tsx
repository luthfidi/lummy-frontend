import React from "react";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaUser, FaWallet, FaHistory } from "react-icons/fa";
import { useWallet } from "../../hooks/useWallet";
import {
  PersonalInfo,
  WalletDetails,
  TransactionHistory,
} from "../../components/profile";

// 🔹 MOCK TRANSACTION DATA
const mockTransactions = Array.from({ length: 15 }, (_, i) => ({
  id: `tx-${i + 1}`,
  date: new Date(Date.now() - i * 86400000 * 2).toISOString(),
  type: ["purchase", "sale", "transfer"][
    Math.floor(Math.random() * 3)
  ] as "purchase" | "sale" | "transfer",
  eventName: [
    "Summer Music Festival",
    "Tech Conference 2025",
    "Blockchain Workshop",
    "Art Exhibition: Future Visions",
  ][Math.floor(Math.random() * 4)],
  amount: Math.floor(Math.random() * 500) + 50,
  currency: "IDRX",
  status: ["completed", "pending", "failed"][
    Math.floor(Math.random() * 3)
  ] as "completed" | "pending" | "failed",
  txHash: `0x${Math.random().toString(16).substring(2, 42)}`,
}));

const ProfilePage: React.FC = () => {
  const { isConnected } = useWallet(); 

  const handleSavePersonalInfo = (data: any) => {
    console.log("Saving personal info:", data);
    // In a real app, update backend here
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg">My Profile</Heading>
      <Text color="gray.600" mb={8}>
        Manage your personal information, wallet, and preferences
      </Text>

      <Tabs variant="enclosed" colorScheme="purple">
        <TabList>
          <Tab>
            <Icon as={FaUser} mr={2} /> Personal Info
          </Tab>
          <Tab>
            <Icon as={FaWallet} mr={2} /> Wallet
          </Tab>
          <Tab>
            <Icon as={FaHistory} mr={2} /> Transactions
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0} py={4}>
            <PersonalInfo
              initialData={{
                name: "",
                email: "",
                phone: "",
                walletAddress: "",
              }}
              onSave={handleSavePersonalInfo}
            />
          </TabPanel>

          <TabPanel px={0} py={4}>
            <WalletDetails />
          </TabPanel>

          <TabPanel px={0} py={4}>
            <TransactionHistory
              transactions={mockTransactions}
              isConnected={isConnected}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;
