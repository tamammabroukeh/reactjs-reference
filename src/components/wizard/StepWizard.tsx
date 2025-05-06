import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export type StepStatus = "completed" | "active" | "incomplete";

export interface StepConfig {
  id: string;
  label: string;
  icon: ReactNode;
  content: ((props: any) => ReactNode) | ReactNode;
  validationSchema?: any;
}

interface StepWizardProps {
  steps: StepConfig[];
  onComplete?: (values: any) => void;
  initialValues?: Record<string, any>;
  className?: string;
}

const StepWizard = ({
  steps,
  onComplete,
  initialValues = {},
  className,
}: StepWizardProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const [stepStatus, setStepStatus] = useState<Record<string, StepStatus>>(
    steps.reduce((acc, step, index) => {
      acc[step.id] = index === 0 ? "active" : "incomplete";
      return acc;
    }, {} as Record<string, StepStatus>)
  );

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setStepStatus((prev) => ({
      ...prev,
      [stepId]: status,
    }));
  };

  const handleStepComplete = (stepId: string, values: any) => {
    updateStepStatus(stepId, "completed");
    setFormValues((prev) => ({ ...prev, ...values }));
  };

  const handleStepChange = (newIndex: number) => {
    const currentStep = steps[currentStepIndex];
    const targetStep = steps[newIndex];

    // Only allow backward navigation freely or forward if current step is completed
    if (
      newIndex < currentStepIndex ||
      stepStatus[currentStep.id] === "completed"
    ) {
      // Update the current active step
      Object.keys(stepStatus).forEach((id) => {
        if (stepStatus[id] === "active") {
          updateStepStatus(
            id,
            stepStatus[id] === "completed" ? "completed" : "incomplete"
          );
        }
      });

      updateStepStatus(targetStep.id, "active");
      setCurrentStepIndex(newIndex);
    }
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      handleStepChange(currentStepIndex + 1);
    } else if (currentStepIndex === steps.length - 1 && onComplete) {
      onComplete(formValues);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      handleStepChange(currentStepIndex - 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const renderStepContent = (step: StepConfig) => {
    if (typeof step.content === "function") {
      return step.content({
        values: formValues,
        onComplete: (stepValues: any) => {
          handleStepComplete(step.id, stepValues);
          goToNextStep();
        },
        onBack: goToPreviousStep,
        isLastStep: currentStepIndex === steps.length - 1,
        isFirstStep: currentStepIndex === 0,
      });
    }
    return step.content;
  };

  return (
    <div className={cn("flex flex-col w-full max-w-4xl mx-auto", className)}>
      {/* Step header */}
      <div className="flex justify-center items-center mb-8 relative">
        {steps.map((step, index) => {
          const status = stepStatus[step.id];
          return (
            <div key={step.id} className="flex items-center">
              {/* Step circle */}
              <button
                type="button"
                onClick={() => handleStepChange(index)}
                disabled={status === "incomplete"}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 relative z-10",
                  {
                    "bg-wizard-active border-wizard-active text-white":
                      status === "active",
                    "bg-wizard-completed border-wizard-completed text-white":
                      status === "completed",
                    "bg-white border-wizard-incomplete text-wizard-incomplete":
                      status === "incomplete",
                    "cursor-pointer": status !== "incomplete",
                    "cursor-not-allowed": status === "incomplete",
                  }
                )}
              >
                {status === "completed" ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <div className="flex items-center justify-center">
                    {step.icon}
                  </div>
                )}
              </button>

              {/* Step label */}
              <span
                className={cn("absolute mt-16 text-sm font-medium", {
                  "text-wizard-active": status === "active",
                  "text-wizard-completed": status === "completed",
                  "text-wizard-incomplete": status === "incomplete",
                })}
              >
                {step.label}
              </span>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div
                  className={cn("h-0.5 w-16 mx-1", {
                    "bg-wizard-completed":
                      stepStatus[steps[index + 1].id] === "completed",
                    "bg-wizard-active":
                      stepStatus[steps[index + 1].id] === "active",
                    "bg-wizard-incomplete":
                      stepStatus[steps[index + 1].id] === "incomplete",
                  })}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="mt-8 p-6 border rounded-lg shadow-sm bg-white">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn("transition-opacity duration-300", {
              block: currentStepIndex === index,
              hidden: currentStepIndex !== index,
            })}
          >
            {currentStepIndex === index && renderStepContent(step)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepWizard;
