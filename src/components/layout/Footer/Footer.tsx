import { ReactNode } from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaDiscord, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

// Social Media Icon Component using React Icons
interface SocialIconProps {
  icon: ReactNode;
  label: string;
  href: string;
}

const SocialIcon = ({ icon, label, href }: SocialIconProps) => {
  return (
    <Link
      href={href}
      isExternal
      aria-label={label}
      rounded={"full"}
      w={8}
      h={8}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      color={useColorModeValue("gray.700", "gray.200")}
      transition={"all 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        color: useColorModeValue("gray.900", "white"),
      }}
    >
      {icon}
    </Link>
  );
};

export const Footer = () => {
  return (
    <Box
      bg="gray.50"
      color="gray.700"
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link href={"#"}>Overview</Link>
            <Link href={"#"}>Features</Link>
            <Link href={"#"}>Tutorials</Link>
            <Link href={"#"}>Pricing</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Press</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Contact Us</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Connect</ListHeader>
            <HStack spacing={4}>
              <SocialIcon
                icon={<FaDiscord size="20px" />}
                label="Discord"
                href="#"
              />
              <SocialIcon
                icon={<FaXTwitter size="20px" />}
                label="Twitter"
                href="#"
              />
              <SocialIcon
                icon={<FaInstagram size="20px" />}
                label="Instagram"
                href="#"
              />
              <SocialIcon
                icon={<FaFacebook size="20px" />}
                label="Facebook"
                href="#"
              />
            </HStack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box py={10}>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © {new Date().getFullYear()} Lummy. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
