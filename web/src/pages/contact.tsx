import { withApollo } from "../utils/withApollo";

const Contact = () => {
  return (
    <div>
      <p>Contact</p>
    </div>
  );
};

export default withApollo({ ssr: false })(Contact);
