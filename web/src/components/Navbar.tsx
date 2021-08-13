import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useApolloClient } from "@apollo/client";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const Navbar = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery({ skip: isServer() });
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const apolloClient = useApolloClient();

  let right;
  if (data?.me) {
    right = (
      <Button
        bgColor="cyan.200"
        onClick={async () => {
          await logout();
          await apolloClient.resetStore();
        }}
        isLoading={logoutLoading}
      >
        Log Out
      </Button>
    );
  } else if (!loading) {
    right = (
      <>
        <Button bgColor="cyan.200" onClick={() => router.push("/login")}>
          Log In
        </Button>
        <Button
          bgColor="cyan.200"
          ml="1rem"
          onClick={() => router.push("/register")}
        >
          Sign Up
        </Button>
      </>
    );
  }

  return (
    <Flex
      height="4rem"
      alignItems="center"
      paddingX="3rem"
      justifyContent="space-between"
    >
      <Flex>
        <Link href="/" passHref>
          <a>
            <Text fontSize="2xl" as="kbd">
              Kondition
            </Text>
          </a>
        </Link>
        <Flex ml="4rem" alignItems="center">
          <Link href="/products" passHref>
            <Button variant="link" color="cyan.400">
              Products
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button ml="2rem" variant="link" color="cyan.400">
              Contact
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Flex>{right}</Flex>
    </Flex>
  );
};
