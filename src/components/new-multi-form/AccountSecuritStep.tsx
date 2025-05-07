import StepForm from "@/components/wizard/StepForm";
import { AccountSecuritySchema } from "@/schemas/AccountSecuritySchema";
import PasswordField from "../wizard/PasswordField";

export const AccountSecurityStep = ({ values, onComplete, onBack }: any) => {
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
