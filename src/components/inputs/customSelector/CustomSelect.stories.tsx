import React from "react";
import { Story } from "@storybook/react";
import { CustomSelect } from "./CustomSelect";
import { CustomSelectProps } from "./CustomSelect";

export default {
  title: "CustomSelect",
  component: CustomSelect,
  args: {
    label: "Custom Select",
    items: { option1: "option1", option2: "option2" },
  },
};

const Template: Story<CustomSelectProps<string>> = (
  args: CustomSelectProps<string>
) => <CustomSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: { option1: "option1", option2: "option2" },
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: "option1",
};
