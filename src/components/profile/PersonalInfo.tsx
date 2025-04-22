import React, { useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Flex,
  Text,
  useToast,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

interface PersonalInfoProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  onSave: (data: any) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ initialData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold">
          Personal Information
        </Text>
        {!isEditing ? (
          <Button
            leftIcon={<EditIcon />}
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <HStack>
            <IconButton
              aria-label="Cancel"
              icon={<CloseIcon />}
              size="sm"
              onClick={handleCancel}
            />
            <IconButton
              aria-label="Save"
              icon={<CheckIcon />}
              size="sm"
              colorScheme="green"
              onClick={handleSave}
            />
          </HStack>
        )}
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <VStack spacing={4} align="center">
          <Avatar
            size="2xl"
            name={formData.name}
            src={formData.avatar}
            mb={2}
          />
          {isEditing && (
            <Button size="sm" colorScheme="purple" variant="outline">
              Change Photo
            </Button>
          )}
        </VStack>

        <VStack spacing={4} flex="1" align="stretch">
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              isReadOnly={!isEditing}
              bg={isEditing ? "white" : "gray.50"}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              isReadOnly={!isEditing}
              bg={isEditing ? "white" : "gray.50"}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isReadOnly={!isEditing}
              bg={isEditing ? "white" : "gray.50"}
            />
          </FormControl>
        </VStack>
      </Flex>
    </Box>
  );
};

export default PersonalInfo;
