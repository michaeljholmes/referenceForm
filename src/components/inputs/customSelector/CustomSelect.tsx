import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";

export interface CustomSelectProps<T> extends SelectProps {
  items: { [key: string]: T };
  name: string;
}

export const CustomSelect = <T extends string | number>({
  name,
  labelId,
  id,
  items,
  label,
  ...rest
}: CustomSelectProps<T>) => (
  <FormControl fullWidth>
    {label && (
      <Typography id={labelId ?? `${name}-select-label`}>{label}</Typography>
    )}
    <Select
      {...rest}
      name={name}
      labelId={labelId ?? `${name}-select-label`}
      id={id ?? `${name}-select-id`}
    >
      {Object.keys(items).map((key: string) => (
        <MenuItem key={key} value={key}>
          {items[key]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
