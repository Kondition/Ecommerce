import Image from "next/image";
import { Box, Button, Link, Text, Flex } from "@chakra-ui/react";
import HeroImage from "../assets/Hero.webp";
import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <Flex direction="column" alignItems="center" padding="3rem">
        <Flex position="relative">
          <Image src={HeroImage} alt="hero" />
          <Box
            position="absolute"
            top="0"
            width="100%"
            height="100%"
            background="blackAlpha.400"
          />
          <Text
            position="absolute"
            bottom="1rem"
            right="1rem"
            color="white"
            fontWeight="bold"
            zIndex="1"
          >
            Gastlosen, Saanen, Switzerland
          </Text>
          <Box
            position="absolute"
            left="10%"
            top="10%"
            bgColor="blackAlpha.500"
            padding="1rem"
            borderRadius="3px"
          >
            <Text
              color="white"
              fontSize="2xl"
              mb="1rem"
              fontWeight="bold"
              letterSpacing="wider"
            >
              Reliable Gear
            </Text>
            <Link href="/products" passHref>
              <Button bgColor="cyan.200">Discover New</Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
