import { useRouter } from "next/router";
import { Checkbox, Flex, Grid, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "../generated/graphql";
import { capitalize } from "../utils/capitalize";
import { withApollo } from "../utils/withApollo";

function convertToNumbers(
  categories: string | string[] | undefined
): number | number[] | undefined {
  if (categories) {
    return typeof categories === "string"
      ? parseInt(categories)
      : categories.map((category) => parseInt(category));
  }

  return undefined;
}

const Products = () => {
  const router = useRouter();
  const { data, loading, refetch } = useGetProductsQuery({
    variables: {
      limit: 8,
      categories: convertToNumbers(router.query.category),
    },
  });
  const { data: dataCategories } = useGetProductCategoriesQuery();

  function isChecked(cid: number) {
    if (router.query.category) {
      if (typeof router.query.category === "string") {
        return String(cid) === router.query.category;
      } else {
        return (
          router.query.category.findIndex((cat) => cat === String(cid)) !== -1
        );
      }
    }

    return false;
  }

  return (
    <Layout>
      <Flex margin="3rem">
        <Flex mr="3rem" direction="column">
          <Text
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="x-large"
            mb="1rem"
          >
            Filters
          </Text>
          <Text fontFamily="monospace" fontWeight="bold" fontSize="md">
            Categories
          </Text>
          {dataCategories?.getProductCategories.map((category) => (
            <Checkbox
              key={category.id}
              isChecked={isChecked(category.id)}
              onChange={(event) => {
                let query;
                const { checked } = event.target;

                if (router.query.category) {
                  if (typeof router.query.category === "string") {
                    query = checked
                      ? {
                          ...router.query,
                          category: [
                            router.query.category,
                            category.id,
                          ] as string[],
                        }
                      : { ...router.query, category: [] };
                  } else {
                    query = checked
                      ? {
                          ...router.query,
                          category: [
                            category.id,
                            ...router.query.category,
                          ] as string[],
                        }
                      : {
                          ...router.query,
                          category: router.query.category.filter(
                            (cid) => cid !== String(category.id)
                          ),
                        };
                  }
                } else {
                  query = { ...router.query, category: [category.id] };
                }

                router.push({ query });
              }}
            >
              {capitalize(category.name)}
            </Checkbox>
          ))}
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap="6">
          {data?.getProducts.products?.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.images[0].imageUrl}
              categories={product.categories}
            />
          ))}
        </Grid>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Products);
