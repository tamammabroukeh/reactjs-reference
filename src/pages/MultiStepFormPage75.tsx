import React from "react";

import { User, Mail, Lock, Phone } from "lucide-react";
import FormStep from "@/components/multi-form75/StepForm";
import MultiStepForm, { Step } from "@/components/multi-form75/MultiStepForm";
import { toast } from "react-toastify";

const MultiStepFormPage75: React.FC = () => {
  // Define the steps for our form
  const steps: Step[] = [
    {
      id: "personal",
      label: "Personal",
      icon: User,
      content: (
        <FormStep
          title="Personal Information"
          fields={[
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              placeholder: "John",
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              placeholder: "Doe",
            },
          ]}
          onSubmit={() => {}} // This gets overridden by MultiStepForm
          stepIndex={0}
          isLastStep={false}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      content: (
        <FormStep
          title="Contact Information"
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "john.doe@example.com",
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "text",
              placeholder: "+1 (555) 123-4567",
            },
          ]}
          onSubmit={() => {}}
          stepIndex={1}
          isLastStep={false}
        />
      ),
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
      content: (
        <FormStep
          title="Create Password"
          fields={[
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "••••••••",
            },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "confirmPassword",
              placeholder: "••••••••",
            },
          ]}
          onSubmit={() => {}}
          stepIndex={2}
          isLastStep={true}
        />
      ),
    },
  ];

  const handleFormSubmit = (values: Record<string, any>) => {
    console.log("Form submitted with values:", values);
    toast("Form Submitted!", {
      data: {
        description: "Your form has been successfully submitted.",
        variant: "success",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Account Registration
        </h1>
        <MultiStepForm
          steps={steps}
          initialValues={{}}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default MultiStepFormPage75;
