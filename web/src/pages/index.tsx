import { withApollo } from "../utils/withApollo";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default withApollo()(Home);
