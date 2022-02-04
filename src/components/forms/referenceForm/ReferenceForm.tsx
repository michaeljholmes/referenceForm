import React from "react";
import { FieldArray, Formik, FormikProps } from "formik";
import { FormikCustomTextField } from "../../inputs/formik/FormikCustomTestField";
import { FormikDatePicker } from "../../inputs/formik/FormikDatePicker";
import { FormikSelect } from "../../inputs/formik/FormikSelect";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { FormSubmitting } from "../FormSubmitting";
import { SchemaOf } from "yup";

interface Employer {
  name: string;
  start_date: Date;
  end_date?: Date | null;
}

export interface ReferenceFormFields {
  first_name: string;
  last_name: string;
  current_address: string;
  employers: Employer[];
  guarantor_name: string;
  guarantor_address: string;
  guarantor_relation: string;
}

type selectOptions<T> = { [key: string]: T };

export interface GuarantorFormProps {
  isSubmittingForm: boolean;
  initialValues: ReferenceFormFields;
  schema: SchemaOf<ReferenceFormFields>;
  onSubmit: (values: ReferenceFormFields) => void | Promise<any>;
  selectOption: selectOptions<string>;
  className?: string;
}

export const ReferenceForm = ({
  isSubmittingForm,
  initialValues,
  schema,
  onSubmit,
  selectOption,
  className,
}: GuarantorFormProps) => (
  <GuarantorFormComponent className={className}>
    <FormSubmitting isSubmitting={isSubmittingForm}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isValid,
          dirty,
          errors,
          touched,
          resetForm,
        }: FormikProps<ReferenceFormFields>) => (
          <StyledForm onSubmit={handleSubmit}>
            <Header variant={"h1"}>Goodlord Referencing form</Header>
            <FormLayout>
              <StyledTypography variant={"h2"}>Personal</StyledTypography>
              <FormikCustomTextField name="first_name" label="First name" />
              <FormikCustomTextField name="last_name" label="Last name" />
              <FormikCustomTextField name="current_address" label="Address" />
            </FormLayout>
            <FieldArray
              name={"employers"}
              render={() => (
                <>
                  {values.employers &&
                    values.employers.length > 0 &&
                    values.employers.map((e, index) => (
                      <FormLayout key={index}>
                        <StyledTypography variant={"h2"}>
                          Employer
                        </StyledTypography>
                        <FormikCustomTextField
                          name={`employers.${index}.name`}
                          label={"Employer name"}
                        />
                        <FieldsRow>
                          <FormikDatePicker
                            name={`employers.${index}.start_date`}
                            label="Start date"
                          />
                          <FormikDatePicker
                            name={`employers.${index}.end_date`}
                            label="End date"
                          />
                        </FieldsRow>
                      </FormLayout>
                    ))}
                </>
              )}
            />
            <FormLayout>
              <StyledTypography variant={"h2"}>Guarantor</StyledTypography>
              <FormikCustomTextField
                name="guarantor_name"
                label="Guarantor name"
              />
              <FormikCustomTextField
                name="guarantor_address"
                label="Guarantor name"
              />
              <FormikSelect<string>
                name="guarantor_relation"
                items={selectOption}
                label={"Relationship to guarantor"}
                disabled={isSubmittingForm}
              />
            </FormLayout>
            <FormButton>
              <Button onClick={() => resetForm()}>Cancel</Button>
              <Button
                type="submit"
                variant={"outlined"}
                disabled={!dirty ? true : Object.keys(errors).length > 0}
              >
                Submit
              </Button>
            </FormButton>
          </StyledForm>
        )}
      </Formik>
    </FormSubmitting>
  </GuarantorFormComponent>
);

const GuarantorFormComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0;
`;

const FormButton = styled.div`
  display: flex;
  align-self: end;
  padding-right: 2rem;
  margin-top: 1rem;
`;

const StyledTypography = styled(Typography)`
  &.MuiTypography-root {
    padding: 0.5rem 0;
    font-size: 1.5rem;
  }
`;
const Header = styled(Typography)`
  &.MuiTypography-root {
    font-size: 2rem;
    text-align: center;
  }
`;

const FieldsRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
`;
