import { ValidationError } from "apollo-server-express";
import * as yup from "yup";

export const schemas = {
  register: yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .max(40, "First name must not contain more than 40 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .max(40, "Last name must not contain more than 40 characters"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must contain at least 6 characters")
      .required("Password is required")
      .max(128, "Password must not contain more than 128 characters"),
  }),
  login: yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
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
