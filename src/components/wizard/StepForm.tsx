import { ReactNode } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

interface StepFormProps {
  initialValues: Record<string, any>;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
  onBack?: () => void;
  children: ((props: FormikProps<any>) => ReactNode) | ReactNode;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  submitButtonText?: string;
  backButtonText?: string;
}

const StepForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  onBack,
  children,
  isFirstStep = false,
  isLastStep = false,
  submitButtonText = "Next",
  backButtonText = "Back",
}: StepFormProps) => {
  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {(formikProps) => (
        <Form className="space-y-6" noValidate>
          {typeof children === "function" ? children(formikProps) : children}

          <div className="flex justify-between pt-4">
            {!isFirstStep && (
              <Button type="button" variant="outline" onClick={onBack}>
                {backButtonText}
              </Button>
            )}
            <div className={isFirstStep ? "ml-auto" : ""}>
              <Button
                type="submit"
                disabled={!formikProps.isValid || formikProps.isSubmitting}
              >
                {isLastStep ? "Complete" : submitButtonText}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepForm;
