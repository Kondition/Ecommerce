import { ValidationError } from "apollo-server-express";
import * as yup from "yup";

export const schemas = {
  register: yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters long"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  }),
};

type SchemaType = typeof schemas[keyof typeof schemas];

export async function validate<T>(schema: SchemaType, data: T) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    return error.inner.map((err: ValidationError) => {
      return { field: err.path, message: err.message };
    });
  }
}
