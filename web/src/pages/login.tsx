import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { withApollo } from "../utils/withApollo";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsNotAuth } from "../hooks/useIsNotAuth";

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  useIsNotAuth();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({
          variables: values,
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.login.user,
              },
            });
          },
        });

        if (response.data?.login.user) {
          router.push("/");
        } else if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField label="Email" name="email" placeholder="Email" />
          <InputField
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(Login);
