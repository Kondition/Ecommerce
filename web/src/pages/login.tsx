import { withApollo } from "../utils/withApollo";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default withApollo({ ssr: false })(Login);
