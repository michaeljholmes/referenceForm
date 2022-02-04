import React from "react";
import { useField } from "formik";
import { StandardTextFieldProps, TextField } from "@mui/material";
import styled from "styled-components";

export const FormikCustomTextField = ({
  ...props
}: StandardTextFieldProps & { name: string }) => {
  const [field, { error, touched }] = useField(props.name);
  return (
    <StyledTextField
      {...props}
      {...field}
      error={touched ? !!error : false}
      helperText={touched && error && error}
    />
  );
};

const StyledTextField = styled(TextField)`
  height: 5rem;
`;
