import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <Alert key={i} status="error">
            <AlertIcon />
            {fieldName} {formErrors[fieldName]}
          </Alert>
        );
      } else {
        return "";
      }
    })}
  </div>
);
