import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { FormFieldProps } from "@/interfaces/shared";

const FormField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  className = "",
  required = false,
}: FormFieldProps) => {
  const [field, meta] = useField(name);

  const isError = meta.touched && meta.error;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="font-medium">
          {label} {required && <span className="text-wizard-error">*</span>}
        </Label>
      </div>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...field}
        className={isError ? "border-wizard-error" : ""}
      />
      {isError && (
        <FormMessage className="text-wizard-error text-sm">
          {meta.error}
        </FormMessage>
      )}
    </div>
  );
};

export default FormField;
