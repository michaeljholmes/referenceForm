import React from "react";
import { useField, useFormikContext } from "formik";
import { CustomDatePicker } from "../customDatePicker/CustomDatePicker";

interface FormikDatePickerProps {
  name: string;
  label: string;
  disabled?: boolean
}

export const FormikDatePicker = ({ label, name, disabled = false }: FormikDatePickerProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, { error, touched }, { setTouched }] = useField(name);
  return (
    <CustomDatePicker
      {...field}
      onChange={(date: Date | unknown) => {
        setFieldValue(field.name, date);
      }}
      onFocus={() => setTouched(true)}
      error={touched ? error : ""}
      label={label}
      disabled={disabled}
    />
  );
};
