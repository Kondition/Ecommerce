import React, { InputHTMLAttributes, useState } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  type,
  size: _,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [field, { error }] = useField(props);

  const InputOrTextarea = textarea ? Textarea : Input;

  const toggleShowPassword = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup size="md">
        <InputOrTextarea
          type={show ? "text" : type}
          id={field.name}
          {...field}
          {...props}
        />
        {type === "password" && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
