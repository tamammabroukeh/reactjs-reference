import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: Array<{
    id: string;
    label: string;
    icon: React.ElementType;
  }>;
  currentStepIndex: number;
  completedSteps: Set<number>;
  onStepClick: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStepIndex,
  completedSteps,
  onStepClick,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(index);
        const isCurrent = index === currentStepIndex;
        const isClickable = index < currentStepIndex || isCompleted;

        // Determine line status for the line AFTER this step
        const showLine = index < steps.length - 1;
        let lineStatus = "future";
        if (index < currentStepIndex) lineStatus = "completed";
        else if (index === currentStepIndex) lineStatus = "current";

        const Icon = step.icon;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 relative",
                  isCompleted
                    ? "bg-purple-500 text-white"
                    : isCurrent
                    ? "bg-purple-100 text-purple-500 border-2 border-purple-500"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </button>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  isCurrent
                    ? "text-purple-500"
                    : isCompleted
                    ? "text-gray-700"
                    : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {showLine && (
              <div
                className={cn(
                  "flex-1 h-px mx-2",
                  lineStatus === "completed"
                    ? "bg-purple-500"
                    : lineStatus === "current"
                    ? "bg-gradient-to-r from-purple-500 to-gray-300"
                    : "bg-gray-300"
                )}
                style={{
                  backgroundImage:
                    lineStatus === "current"
                      ? "linear-gradient(to right, #8B5CF6 50%, transparent 50%)"
                      : "none",
                  backgroundSize:
                    lineStatus === "current" ? "20px 1px" : "auto",
                  backgroundRepeat: "repeat-x",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
