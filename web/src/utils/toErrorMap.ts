import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap = errors.reduce<Record<string, string>>((errMap, err) => {
    errMap[err.field] = err.message;

    return errMap;
  }, {});

  return errorMap;
};
