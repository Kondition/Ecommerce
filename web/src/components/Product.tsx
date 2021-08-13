import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const Product: React.FC<Product> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  return (
    <Link href={`/product/${id}`}>
      <Flex
        key={id}
        direction="column"
        border="1px solid"
        borderColor="cyan.300"
        height="100%"
        textDecoration="none"
      >
        <Image
          src={image as any}
          alt="name"
          objectFit="cover"
          height="200%"
          width="100%"
        />
        <Flex m="1rem" direction="column" flexGrow={1}>
          <Text fontWeight="bold">{name}</Text>
          <Text noOfLines={5} flexGrow={1}>
            {description}
          </Text>
          <Flex justifyContent="flex-end">
            {" "}
            <Text fontWeight="bold">&#8364;{price}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
