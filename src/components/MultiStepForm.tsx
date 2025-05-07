import React, { useState, ReactElement, isValidElement, Children } from "react";
import { Check, ChevronRight, Circle } from "@mui/icons-material";
import { Button } from "./ui/button";


export const MultiStepForm = ({
  steps,
  initialStep = 0,
  activeColor = "bg-blue-600",
  completedColor = "bg-green-500",
  inactiveColor = "bg-gray-300",
  children,
  onSubmit,
}: StepFormProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      handleNext();
    }
  };

  const updateFormData = (stepData: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const isStepComplete = (stepIndex: number) => {
    return completedSteps.includes(stepIndex);
  };
  // Filter out null/undefined children and get the current step content
  const currentStepContent = Children.toArray(children).filter((child) =>
    isValidElement(child)
  )[currentStep] as ReactElement<StepChildProps> | undefined;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  currentStep === index
                    ? activeColor
                    : isStepComplete(index)
                    ? completedColor
                    : inactiveColor
                }`}
              >
                {isStepComplete(index) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.icon || <Circle className="w-5 h-5" />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep === index ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 relative">
                <div
                  className={`absolute top-0 left-0 h-full ${
                    isStepComplete(index) ? completedColor : inactiveColor
                  }`}
                  style={{ width: isStepComplete(index) ? "100%" : "0%" }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {currentStepContent &&
          React.cloneElement(currentStepContent, {
            isActive: true,
            updateFormData,
            formData,
          })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstStep}
          className="flex items-center"
        >
          Previous
        </Button>

        <Button
          onClick={handleSubmit}
          className="flex items-center"
          disabled={!isStepComplete(currentStep) && !isLastStep}
        >
          {isLastStep ? "Submit" : "Next"}
          {!isLastStep && <ChevronRight className="ml-1 w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
