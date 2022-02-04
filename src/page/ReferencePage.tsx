import React, { useMemo, useState } from "react";
import { MockApiClient } from "./../api/apiClient";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import styled from "styled-components";
import {
  ReferenceForm,
  ReferenceFormFields,
} from "../components/forms/referenceForm/ReferenceForm";
import { Snackbar, Alert, AlertColor} from "@mui/material";

export const referenceOptions = {
  parent: "Parent",
  sibling: "Sibling",
  employer: "Employer",
  other: "Other",
};

export const referenceFormSchema: SchemaOf<ReferenceFormFields> =
  Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    current_address: Yup.string().required("Required"),
    employers: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        start_date: Yup.date().required("Required").nullable(),
        end_date: Yup.date().nullable(),
      })
    ),
    guarantor_name: Yup.string().required("Required"),
    guarantor_address: Yup.string().required("Required"),
    guarantor_relation: Yup.string().required("Required"),
  });

// TODO could make available via provider.
const apiClient = new MockApiClient();

interface SnackbarState {
  severity: AlertColor;
  message: string;
  isOpen: boolean;
}

export const ReferencePage = () => {
  // Future implementation might require submitting multiple employees from the shape of the POST
  const [numberOfEmployers] = useState(1);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    severity: "success",
    isOpen: false,
  });
  const initialValues = useMemo(
    () => ({
      first_name: "",
      last_name: "",
      current_address: "",
      startDate: new Date(),
      employers: new Array(numberOfEmployers).fill({
        name: "",
        start_date: null,
        end_date: null,
      }),
      guarantor_name: "",
      guarantor_address: "",
      guarantor_relation: Object.keys(referenceOptions)[0],
    }),
    [numberOfEmployers]
  );

  const onSubmit = async ({
    first_name,
    last_name,
    current_address,
    employers,
    guarantor_address,
    guarantor_name,
    guarantor_relation,
  }: ReferenceFormFields) => {
    try {
      setIsSubmittingForm(true);
      await apiClient.postReference({
        personal: { first_name, last_name, current_address },
        employers,
        guarantor: {
          address: guarantor_address,
          name: guarantor_name,
          relation: guarantor_relation,
        },
      });
      setSnackbar({
        severity: "success",
        message: "Successfully submitted reference",
        isOpen: true,
      });
    } catch (e) {
      console.error(e);
      setSnackbar({
        severity: "error",
        message: "Submission fail - please try again",
        isOpen: true,
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const closeSnackbar = () => {
    setSnackbar((state) => ({ ...state, isOpen: false }));
  };

  return (
    <>
      <StyledReferenceForm
        isSubmittingForm={isSubmittingForm}
        onSubmit={onSubmit}
        initialValues={initialValues}
        schema={referenceFormSchema}
        selectOption={referenceOptions}
      />
      <StyedSnackbar
        open={snackbar.isOpen}
        autoHideDuration={6000000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </StyedSnackbar>
    </>
  );
};

const StyledReferenceForm = styled(ReferenceForm)`
  margin: auto;
  max-width: 50rem;
  min-width: 25rem;
`;

const StyedSnackbar = styled(Snackbar)`
  &.MuiSnackbar-root {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 25rem;
  }
`;
