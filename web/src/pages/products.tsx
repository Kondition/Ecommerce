import { withApollo } from "../utils/withApollo";

const Products = () => {
  return (
    <div>
      <p>Products</p>
    </div>
  );
};

export default withApollo({ ssr: true })(Products);
