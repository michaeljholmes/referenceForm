import React from "react";
import {
  GuarantorFormProps,
  ReferenceForm,
  ReferenceFormFields,
} from "./ReferenceForm";
import { Story } from "@storybook/react";
import {
  referenceFormSchema,
  referenceOptions,
} from "../../../page/ReferencePage";

const initialValues = {
  first_name: "",
  last_name: "",
  current_address: "",
  startDate: new Date(),
  employers: new Array(1).fill({
    name: "",
    start_date: new Date(),
    end_date: new Date(),
  }),
  guarantor_name: "",
  guarantor_address: "",
  guarantor_relation: Object.keys(referenceOptions)[0],
};

export default {
  title: "ReferenceForm",
  component: ReferenceForm,
  args: {
    initialValues,
    onSubmit: (values: ReferenceFormFields) => console.log(values),
    schema: referenceFormSchema,
    selectOption: referenceOptions,
  },
};

const Template: Story<GuarantorFormProps> = (args: GuarantorFormProps) => (
  <ReferenceForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isSubmittingForm: false,
};

export const IsSubmitting = Template.bind({});
IsSubmitting.args = {
  isSubmittingForm: true,
};
