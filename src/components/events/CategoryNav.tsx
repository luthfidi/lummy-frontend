import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaMusic,
  FaLaptopCode,
  FaFootballBall,
  FaPaintBrush,
  FaGraduationCap,
  FaUtensils,
  FaFilm,
  FaTheaterMasks,
} from "react-icons/fa";

interface CategoryItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface CategoryNavProps {
  onCategorySelect: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ onCategorySelect }) => {
  const categories: CategoryItem[] = [
    { name: "Music", icon: FaMusic, color: "purple.500" },
    { name: "Technology", icon: FaLaptopCode, color: "blue.500" },
    { name: "Sports", icon: FaFootballBall, color: "green.500" },
    { name: "Art", icon: FaPaintBrush, color: "pink.500" },
    { name: "Education", icon: FaGraduationCap, color: "yellow.500" },
    { name: "Food", icon: FaUtensils, color: "orange.500" },
    { name: "Movies", icon: FaFilm, color: "red.500" },
    { name: "Theater", icon: FaTheaterMasks, color: "teal.500" },
  ];

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <SimpleGrid columns={{ base: 2, md: 4, lg: 8 }} spacing={4}>
      {categories.map((category) => (
        <Box
          key={category.name}
          bg={bgColor}
          p={4}
          borderRadius="lg"
          textAlign="center"
          cursor="pointer"
          boxShadow="sm"
          transition="all 0.3s"
          onClick={() => onCategorySelect(category.name)}
          _hover={{
            transform: "translateY(-3px)",
            boxShadow: "md",
            bg: hoverBg,
          }}
        >
          <Flex
            justify="center"
            align="center"
            h="50px"
            w="50px"
            bg={`${category.color}20`}
            color={category.color}
            borderRadius="full"
            mx="auto"
            mb={2}
          >
            <Icon as={category.icon} boxSize={5} />
          </Flex>
          <Text fontWeight="medium" mt={2}>
            {category.name}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CategoryNav;
