import StepForm from "@/components/wizard/StepForm";
import FormField from "@/components/wizard/FormField";
import { PersonalInfoSchema } from "@/schemas/PersonalInfoSchema";
export const PersonalInfoStep = ({
  values,
  onComplete,
  onBack,
  isFirstStep,
}: any) => {
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
