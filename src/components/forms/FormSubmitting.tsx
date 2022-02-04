import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

export interface FormSubmittingProps {
  isSubmitting: boolean;
}

export const FormSubmitting = ({
  isSubmitting,
  children,
}: PropsWithChildren<FormSubmittingProps>) => (
  <StyledFieldSet disabled={isSubmitting}>
    {isSubmitting && <StyledCircularProgress size={70} />}
    <Opacity makeOpaque={isSubmitting}>{children}</Opacity>
  </StyledFieldSet>
);

const StyledFieldSet = styled.fieldset`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  border: none;
  width: 100%;
`;

const StyledCircularProgress = styled(CircularProgress)`
  grid-area: 1/1/1/1;
  align-self: center;
  justify-self: center;
`;

const Opacity = styled.div<{ makeOpaque: boolean }>`
  grid-area: 1/1/1/1;
  ${({ makeOpaque }) => makeOpaque && `opacity: 50%`};
  user-select: none;
`;
