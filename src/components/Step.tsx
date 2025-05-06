import React, { isValidElement, Children, cloneElement } from "react";

interface StepChildProps {
  isActive?: boolean;
  updateFormData?: (data: Record<string, any>) => void;
  formData?: Record<string, any>;
  children?: React.ReactNode;
}

interface FormElementProps {
  name?: string;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  // Add other form element props as needed
}

export const Step = ({
  children,
  isActive,
  updateFormData,
  formData,
}: StepChildProps) => {
  if (!isActive) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    updateFormData?.({ [target.name]: target.value });
  };

  return (
    <div className="space-y-4">
      {Children.map(children, (child) => {
        if (isValidElement<FormElementProps>(child)) {
          return cloneElement(child, {
            onChange: handleChange,
            value: formData?.[child.props.name ?? ""] ?? "",
          });
        }
        return child;
      })}
    </div>
  );
};
