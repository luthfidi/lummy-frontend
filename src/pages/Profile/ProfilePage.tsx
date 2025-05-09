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
import { FaUser, FaWallet, FaHistory, FaCog } from "react-icons/fa";
import {
  PersonalInfo,
  WalletDetails,
  TransactionHistory,
  Preferences,
} from "../../components/profile";

// Mock data
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://bit.ly/dan-abramov",
};

const mockTransactions = Array.from({ length: 15 }, (_, i) => ({
  id: `tx-${i + 1}`,
  date: new Date(Date.now() - i * 86400000 * 2).toISOString(),
  type: ["purchase", "sale", "transfer"][Math.floor(Math.random() * 3)] as
    | "purchase"
    | "sale"
    | "transfer",
  eventName: [
    "Summer Music Festival",
    "Tech Conference 2025",
    "Blockchain Workshop",
    "Art Exhibition: Future Visions",
  ][Math.floor(Math.random() * 4)],
  amount: Math.floor(Math.random() * 500) + 50,
  currency: "IDRX",
  status: ["completed", "pending", "failed"][Math.floor(Math.random() * 3)] as
    | "completed"
    | "pending"
    | "failed",
  txHash: `0x${Math.random().toString(16).substring(2, 42)}`,
}));

const mockPreferences = {
  notifications: [
    {
      id: "event-updates",
      label: "Event Updates",
      value: true,
      description: "Get notified about changes to events you have tickets for",
    },
    {
      id: "price-alerts",
      label: "Price Alerts",
      value: false,
      description:
        "Receive alerts when tickets you might be interested in drop in price",
    },
    {
      id: "new-events",
      label: "New Events",
      value: true,
      description: "Be the first to know when new events are added",
    },
    {
      id: "reminders",
      label: "Event Reminders",
      value: true,
      description: "Get reminded before events start",
    },
  ],
  privacySettings: [
    {
      id: "public-profile",
      label: "Public Profile",
      value: false,
      description: "Allow others to see your profile and tickets",
    },
    {
      id: "share-data",
      label: "Share Data with Organizers",
      value: true,
      description: "Share your contact information with event organizers",
    },
  ],
  interestedCategories: [
    { id: "music", label: "Music", selected: true },
    { id: "technology", label: "Technology", selected: true },
    { id: "sports", label: "Sports", selected: false },
    { id: "arts", label: "Arts & Theater", selected: true },
    { id: "education", label: "Education", selected: false },
    { id: "food", label: "Food & Drink", selected: true },
  ],
};

const ProfilePage: React.FC = () => {
  const handleSavePersonalInfo = (data: any) => {
    console.log("Saving personal info:", data);
    // In a real app, this would update the backend
  };

  const handleSavePreferences = (data: any) => {
    console.log("Saving preferences:", data);
    // In a real app, this would update the backend
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg">
        My Profile
      </Heading>
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
          <Tab>
            <Icon as={FaCog} mr={2} /> Preferences
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0} py={4}>
            <PersonalInfo
              initialData={mockUserData}
              onSave={handleSavePersonalInfo}
            />
          </TabPanel>

          <TabPanel px={0} py={4}>
            <WalletDetails />
          </TabPanel>

          <TabPanel px={0} py={4}>
            <TransactionHistory transactions={mockTransactions} />
          </TabPanel>

          <TabPanel px={0} py={4}>
            <Preferences
              initialPreferences={mockPreferences}
              onSave={handleSavePreferences}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;
