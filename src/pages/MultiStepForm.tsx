import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, Home, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

import StepWizard, { StepConfig } from "@/components/wizard/StepWizard";
import StepForm from "@/components/wizard/StepForm";
import FormField from "@/components/wizard/FormField";
import PasswordField from "@/components/wizard/PasswordField";

// Step 1: Personal Information


const PersonalInfoStep = ({ values, onComplete, onBack, isFirstStep }: any) => {
  const initialValues = {
    firstName: values.firstName || "",
    lastName: values.lastName || "",
    email: values.email || "",
  };

  return (
    <StepForm
      initialValues={initialValues}
      validationSchema={PersonalInfoSchema}
      onSubmit={onComplete}
      onBack={onBack}
      isFirstStep={isFirstStep}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-gray-600">
          Please provide your basic information to get started.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            required
          />
        </div>

        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
        />
      </div>
    </StepForm>
  );
};

// Step 2: Account Security
const AccountSecuritySchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const AccountSecurityStep = ({ values, onComplete, onBack }: any) => {
  const initialValues = {
    password: values.password || "",
    confirmPassword: values.confirmPassword || "",
  };

  return (
    <StepForm
      initialValues={initialValues}
      validationSchema={AccountSecuritySchema}
      onSubmit={onComplete}
      onBack={onBack}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Account Security</h2>
        <p className="text-gray-600">
          Create a secure password for your account.
        </p>

        <div className="space-y-4">
          <PasswordField
            label="Password"
            name="password"
            placeholder="Create a password"
            required
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            showStrengthIndicator={false}
          />
        </div>
      </div>
    </StepForm>
  );
};

// Step 3: Address Information
const AddressSchema = Yup.object().shape({
  street: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string()
    .required("ZIP code is required")
    .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
});

const AddressStep = ({ values, onComplete, onBack }: any) => {
  const initialValues = {
    street: values.street || "",
    city: values.city || "",
    state: values.state || "",
    zipCode: values.zipCode || "",
  };

  return (
    <StepForm
      initialValues={initialValues}
      validationSchema={AddressSchema}
      onSubmit={onComplete}
      onBack={onBack}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Address Information</h2>
        <p className="text-gray-600">Please provide your address details.</p>

        <FormField
          label="Street Address"
          name="street"
          placeholder="Enter your street address"
          required
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="City"
            name="city"
            placeholder="Enter your city"
            required
          />
          <FormField
            label="State"
            name="state"
            placeholder="Enter your state"
            required
          />
        </div>

        <FormField
          label="ZIP Code"
          name="zipCode"
          placeholder="Enter your ZIP code"
          required
        />
      </div>
    </StepForm>
  );
};

// Step 4: Review & Submit
const ReviewStep = ({ values, onComplete, onBack, isLastStep }: any) => {
  return (
    <StepForm
      initialValues={{}}
      validationSchema={Yup.object({})}
      onSubmit={onComplete}
      onBack={onBack}
      isLastStep={isLastStep}
      submitButtonText="Submit Registration"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Review Your Information</h2>
        <p className="text-gray-600">
          Please review the information you've provided before submitting.
        </p>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">First Name</p>
              <p>{values.firstName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Name</p>
              <p>{values.lastName}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{values.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Address Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">
                Street Address
              </p>
              <p>{values.street}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">City</p>
              <p>{values.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">State</p>
              <p>{values.state}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">ZIP Code</p>
              <p>{values.zipCode}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepForm>
  );
};

// Success Screen
const SuccessStep = ({ values }: any) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-10 space-y-6">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
        <Check className="h-12 w-12 text-wizard-completed" />
      </div>
      <h2 className="text-2xl font-bold">Registration Complete!</h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Thank you for registering, {values.firstName}! Your account has been
        successfully created.
      </p>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
};

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
    <div className="container mx-auto py-12 px-4">
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
