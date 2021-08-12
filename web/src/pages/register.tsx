import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { withApollo } from "../utils/withApollo";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsNotAuth } from "../hooks/useIsNotAuth";

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  useIsNotAuth();

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({
          variables: values,
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.register.user,
              },
            });
          },
        });

        if (response.data?.register.user) {
          router.push("/");
        } else if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            label="First Name"
            name="firstName"
            placeholder="First Name"
          />
          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
          />
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(Register);
