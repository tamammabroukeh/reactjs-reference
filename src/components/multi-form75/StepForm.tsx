import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PasswordField from "./PasswordField";

interface FormStepProps {
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "password" | "confirmPassword" | "number";
    placeholder?: string;
    validation?: any;
  }>;
  onSubmit: (values: Record<string, any>, isValid: boolean) => void;
  onBack?: () => void;
  initialValues?: Record<string, any>;
  stepIndex: number;
  isLastStep: boolean;
}

const FormStep: React.FC<FormStepProps> = ({
  title,
  fields,
  onSubmit,
  onBack,
  initialValues = {},
  stepIndex,
  isLastStep,
}) => {
  // Generate validation schema
  const validationSchema = fields.reduce((schema, field) => {
    if (field.validation) {
      schema[field.name] = field.validation;
    } else {
      // Default validations based on field type
      switch (field.type) {
        case "email":
          schema[field.name] = Yup.string()
            .email("Invalid email address")
            .required("Required");
          break;
        case "password":
          schema[field.name] = Yup.string()
            .min(8, "Must be at least 8 characters")
            .matches(/[0-9]/, "Must contain at least one number")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/[^\w]/, "Must contain at least one special character")
            .required("Required");
          break;
        case "confirmPassword":
          schema[field.name] = Yup.string()
            .oneOf(
              [Yup.ref(field.name.replace("Confirm", ""))],
              "Passwords must match"
            )
            .required("Required");
          break;
        case "number":
          schema[field.name] = Yup.number().required("Required");
          break;
        default:
          schema[field.name] = Yup.string().required("Required");
      }
    }
    return schema;
  }, {} as Record<string, any>);

  // Generate initial values
  const defaultValues = fields.reduce((values, field) => {
    values[field.name] = initialValues[field.name] || "";
    return values;
  }, {} as Record<string, any>);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

      <Formik
        initialValues={defaultValues}
        validationSchema={Yup.object().shape(validationSchema)}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          onSubmit(values, true);
          setSubmitting(false);
        }}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>

                {field.type === "password" ? (
                  <PasswordField
                    name={field.name}
                    placeholder={field.placeholder || ""}
                  />
                ) : (
                  <Field name={field.name}>
                    {({ field: formikField, meta }: any) => (
                      <div>
                        <Input
                          {...formikField}
                          type={
                            field.type === "confirmPassword"
                              ? "password"
                              : field.type
                          }
                          placeholder={field.placeholder || ""}
                          className={cn(
                            meta.touched && meta.error && "border-red-500"
                          )}
                        />
                      </div>
                    )}
                  </Field>
                )}

                <ErrorMessage name={field.name}>
                  {(msg) => (
                    <div className="text-xs text-red-500 mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              {stepIndex > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <div className={stepIndex === 0 ? "ml-auto" : ""}>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="flex items-center gap-2"
                >
                  {isLastStep ? "Submit" : "Next"}
                  {!isLastStep && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormStep;
