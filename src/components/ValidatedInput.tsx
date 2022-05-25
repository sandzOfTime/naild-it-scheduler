import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

type FormProps = {
  label: string;
  id: string;
  error: boolean;
  errorText: string;
  rules: Rules;
  control: any;
  margin?: "normal";
  type?: string;
};

type Rules = {
  required: boolean;
  pattern?: any;
};

const ValidatedInput: React.FC<FormProps> = ({
  label,
  id,
  error,
  control,
  errorText,
  rules,
  margin,
  type,
}) => {
  return (
    <>
      <Controller
        render={({ field: { name, value, onChange } }) => (
          <TextField
            autoComplete={id}
            fullWidth
            id={id}
            label={label}
            autoFocus
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            helperText={error && errorText}
            margin={margin}
            type={type}
          />
        )}
        control={control}
        name={id}
        defaultValue=""
        rules={rules}
      />
    </>
  );
};

export default ValidatedInput;
