import React, { useState } from "react";
import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PasswordFieldProps {
  name: string;
  placeholder: string;
}

interface ValidationRule {
  id: string;
  label: string;
  validator: (value: string) => boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ name, placeholder }) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const validationRules: ValidationRule[] = [
    {
      id: "length",
      label: "At least 8 characters",
      validator: (value) => value.length >= 8,
    },
    {
      id: "lowercase",
      label: "One lowercase letter",
      validator: (value) => /[a-z]/.test(value),
    },
    {
      id: "uppercase",
      label: "One uppercase letter",
      validator: (value) => /[A-Z]/.test(value),
    },
    {
      id: "number",
      label: "One number",
      validator: (value) => /\d/.test(value),
    },
    {
      id: "special",
      label: "One special character",
      validator: (value) => /[^\w\s]/.test(value),
    },
  ];
  console.log(field);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <Input
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={cn(meta.touched && meta.error && "border-red-500", "pr-10")}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          field.onBlur(e);
          setIsFocused(false);
        }}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>

      <TooltipProvider>
        <Tooltip open={isFocused || field.value.length > 0}>
          <TooltipTrigger asChild>
            <div />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="start"
            className="p-4 bg-white shadow-lg border border-gray-200 rounded-lg w-80"
          >
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">
                Password must have:
              </h4>
              <ul className="space-y-1">
                {validationRules.map((rule) => {
                  const isValid = rule.validator(field.value);
                  return (
                    <li
                      key={rule.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      {isValid ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={cn(
                          isValid ? "text-green-700" : "text-gray-600"
                        )}
                      >
                        {rule.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PasswordField;
