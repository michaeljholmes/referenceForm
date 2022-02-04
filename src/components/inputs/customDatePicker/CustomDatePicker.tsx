import React from "react";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export interface CustomDatePickerProps
  extends Omit<DatePickerProps, "renderInput"> {
  error: string | undefined;
  onFocus: () => void;
}

export const CustomDatePicker = ({
  error,
  onFocus,
  ...rest
}: CustomDatePickerProps) => (
  <Container>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(params: any) => (
          <TextField
            onFocus={onFocus}
            {...params}
            helperText={params?.inputProps?.placeholder}
          />
        )}
        {...rest}
      />
    </LocalizationProvider>
    <RedTypography>{error}</RedTypography>
  </Container>
);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  & input {
    height: 2rem;
  }
`;

const RedTypography = styled(Typography)`
  color: #d32f2f;
`;
