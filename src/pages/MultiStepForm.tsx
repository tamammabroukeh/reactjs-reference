import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";

import StepWizard from "@/components/wizard/StepWizard";
import { SuccessStep } from "@/components/new-multi-form/SuccessStep";
import { steps } from "@/data";

const MultiStepForm = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({});

  const handleComplete = (values: any) => {
    setFormData(values);
    setIsCompleted(true);

    toast("Registration Successful", {});

    // Here you would typically send the data to an API
    console.log("Form submitted with values:", values);
  };

  return (
    <div className="container bg-red-400 mx-auto py-12 px-4">
      <ToastContainer />
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <p className="text-gray-600 mt-2">
          Complete the steps below to set up your account.
        </p>
      </div>
      {isCompleted ? (
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-0">
            <SuccessStep values={formData} />
          </CardContent>
        </Card>
      ) : (
        <StepWizard
          steps={steps}
          onComplete={handleComplete}
          className="max-w-3xl mx-auto"
        />
      )}
    </div>
  );
};

export default MultiStepForm;
