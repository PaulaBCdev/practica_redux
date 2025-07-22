import clsx from "clsx";
import type { ComponentProps } from "react";

interface FormFieldProps extends ComponentProps<"input"> {
  label: string;
  classNameLabel?: string;
  classNameInput?: string;
}

function FormField({
  label,
  classNameLabel,
  classNameInput,
  ...props
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label className={clsx("form-field-label", classNameLabel)}>
        {label}
      </label>
      <input
        className={clsx("form-field-input", classNameInput)}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}

export default FormField;
