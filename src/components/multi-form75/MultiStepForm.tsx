import React, { useState } from "react";
import { FormikProvider } from "formik";
import { cn } from "@/lib/utils";
import StepIndicator from "./StepIndicator";

export interface Step {
  id: string;
  label: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  className?: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  initialValues,
  onSubmit,
  className,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formValues, setFormValues] = useState(initialValues);

  const isStepCompleted = (stepIndex: number) => {
    return completedSteps.has(stepIndex);
  };

  const markStepAsCompleted = (stepIndex: number) => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(stepIndex);
    setCompletedSteps(newCompletedSteps);
  };

  const handleStepSubmit = (values: Record<string, any>, isValid: boolean) => {
    setFormValues({ ...formValues, ...values });

    if (isValid) {
      markStepAsCompleted(currentStepIndex);

      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        onSubmit(values);
      }
    }
  };

  const navigateToStep = (stepIndex: number) => {
    if (stepIndex < currentStepIndex || isStepCompleted(stepIndex)) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className={cn("w-full max-w-3xl mx-auto px-4", className)}>
      <StepIndicator
        steps={steps}
        currentStepIndex={currentStepIndex}
        completedSteps={completedSteps}
        onStepClick={navigateToStep}
      />

      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <FormikProvider value={null}>
          {React.cloneElement(currentStep.content as React.ReactElement, {
            onSubmit: handleStepSubmit,
            initialValues: formValues,
            stepIndex: currentStepIndex,
            isLastStep: currentStepIndex === steps.length - 1,
          })}
        </FormikProvider>
      </div>
    </div>
  );
};

export default MultiStepForm;
