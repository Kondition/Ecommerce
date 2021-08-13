import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Products = () => {
  const { data, loading } = useGetProductsQuery();

  return (
    <Layout>
      <Flex margin="3rem">
        <Box mr="3rem">
          <Text fontFamily="monospace" fontWeight="bold" fontSize="x-large">
            Filters
          </Text>
          <Text fontFamily="monospace" fontWeight="bold" fontSize="md">
            Categories
          </Text>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap="6">
          {data?.getProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.images[0].imageUrl}
            />
          ))}
        </Grid>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Products);
