import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Switch,
  Flex,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

interface PreferenceOption {
  id: string;
  label: string;
  value: boolean;
  description?: string;
}

interface CategoriesPreference {
  id: string;
  label: string;
  selected: boolean;
}

interface PreferencesProps {
  initialPreferences: {
    notifications: PreferenceOption[];
    privacySettings: PreferenceOption[];
    interestedCategories: CategoriesPreference[];
  };
  onSave: (preferences: any) => void;
}

const Preferences: React.FC<PreferencesProps> = ({
  initialPreferences,
  onSave,
}) => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isChanged, setIsChanged] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.700");

  const handleToggle = (
    section: "notifications" | "privacySettings",
    id: string
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, value: !item.value } : item
      ),
    }));
    setIsChanged(true);
  };

  const handleCategoryToggle = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      interestedCategories: prev.interestedCategories.map((cat) =>
        cat.id === id ? { ...cat, selected: !cat.selected } : cat
      ),
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    onSave(preferences);
    setIsChanged(false);
    toast({
      title: "Preferences Saved",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      p={6}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold">
          Preferences
        </Text>
        <Button
          colorScheme="purple"
          size="sm"
          isDisabled={!isChanged}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Flex>

      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontWeight="medium" mb={4}>
            Notification Preferences
          </Text>
          <VStack spacing={4} align="stretch">
            {preferences.notifications.map((notification) => (
              <Flex
                key={notification.id}
                justify="space-between"
                align="center"
                p={3}
                borderWidth="1px"
                borderRadius="md"
              >
                <Box>
                  <Text fontWeight="medium">{notification.label}</Text>
                  {notification.description && (
                    <Text fontSize="sm" color="gray.500">
                      {notification.description}
                    </Text>
                  )}
                </Box>
                <Switch
                  colorScheme="purple"
                  isChecked={notification.value}
                  onChange={() =>
                    handleToggle("notifications", notification.id)
                  }
                />
              </Flex>
            ))}
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={4}>
            Privacy Settings
          </Text>
          <VStack spacing={4} align="stretch">
            {preferences.privacySettings.map((setting) => (
              <Flex
                key={setting.id}
                justify="space-between"
                align="center"
                p={3}
                borderWidth="1px"
                borderRadius="md"
              >
                <Box>
                  <Text fontWeight="medium">{setting.label}</Text>
                  {setting.description && (
                    <Text fontSize="sm" color="gray.500">
                      {setting.description}
                    </Text>
                  )}
                </Box>
                <Switch
                  colorScheme="purple"
                  isChecked={setting.value}
                  onChange={() => handleToggle("privacySettings", setting.id)}
                />
              </Flex>
            ))}
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={4}>
            Interested Event Categories
          </Text>
          <VStack spacing={4} align="stretch">
            {preferences.interestedCategories.map((category) => (
              <Flex
                key={category.id}
                justify="space-between"
                align="center"
                p={3}
                borderWidth="1px"
                borderRadius="md"
              >
                <Text>{category.label}</Text>
                <Switch
                  colorScheme="purple"
                  isChecked={category.selected}
                  onChange={() => handleCategoryToggle(category.id)}
                />
              </Flex>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Preferences;
