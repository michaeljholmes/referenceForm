import React from "react";
import { useField, useFormikContext } from "formik";
import {
  CustomSelect,
  CustomSelectProps,
} from "../customSelector/CustomSelect";

interface FormikSelectProps<T> extends CustomSelectProps<T> {
  name: string;
}

export const FormikSelect = <T extends string | number>({
  ...props
}: FormikSelectProps<T>) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  return (
    <CustomSelect<T>
      {...props}
      {...field}
      onChange={(event) => {
        setFieldValue(field.name, event.target.value);
      }}
    />
  );
};
