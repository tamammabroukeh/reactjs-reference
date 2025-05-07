import { useField } from "formik";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { Check, X, Eye, EyeOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DEFAULT_RULES } from "@/data";
import { PasswordFieldProps } from "@/interfaces/shared";

const PasswordField = ({
  label,
  name,
  placeholder = "",
  className = "",
  showStrengthIndicator = true,
  required = false,
  rules = DEFAULT_RULES,
}: PasswordFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isError = meta.touched && meta.error;

  // Check each rule against the current password value
  const checkRules = rules.map((rule) => ({
    ...rule,
    valid: rule.validator(field.value || ""),
  }));

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="font-medium">
          {label} {required && <span className="text-wizard-error">*</span>}
        </Label>
      </div>

      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...field}
          className={isError ? "border-wizard-error pr-10" : "pr-10"}
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {isError && (
        <FormMessage className="text-wizard-error text-sm">
          {meta.error}
        </FormMessage>
      )}

      {/* Password strength tooltip */}
      {showStrengthIndicator && field.value && (
        <div className="mt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-gray-500 cursor-help">
                  <span>Password strength</span>
                  <div className="ml-2 flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const strength = checkRules.filter((r) => r.valid).length;
                      const isFilled =
                        i < Math.ceil((strength / rules.length) * 4);
                      return (
                        <div
                          key={i}
                          className={`h-1.5 w-5 rounded-full ${
                            isFilled
                              ? strength <= 1
                                ? "bg-wizard-error"
                                : strength <= 3
                                ? "bg-yellow-500"
                                : "bg-wizard-completed"
                              : "bg-gray-200"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-0">
                <div className="bg-white rounded-md shadow-lg border p-3">
                  <h3 className="font-medium text-sm mb-2">
                    Password requirements:
                  </h3>
                  <ul className="space-y-1">
                    {checkRules.map((rule) => (
                      <li key={rule.id} className="flex items-center text-sm">
                        {rule.valid ? (
                          <Check className="h-4 w-4 text-wizard-completed mr-2" />
                        ) : (
                          <X className="h-4 w-4 text-wizard-error mr-2" />
                        )}
                        <span>{rule.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default PasswordField;
