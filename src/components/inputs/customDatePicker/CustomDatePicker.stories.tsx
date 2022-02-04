import React from "react";
import { Story } from "@storybook/react";
import { CustomDatePicker, CustomDatePickerProps } from "./CustomDatePicker";

export default {
  title: "CustomDatePicker",
  component: CustomDatePicker,
  args: {
    label: "Date Field",
  },
};

const Template: Story<CustomDatePickerProps> = (
  args: CustomDatePickerProps
) => <CustomDatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: new Date().toString(),
};

export const Error = Template.bind({});
Error.args = {
  value: null,
  error: "Must select a date",
};
