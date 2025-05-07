import StepForm from "@/components/wizard/StepForm";
import { AddressSchema } from "@/schemas/Addresschema";
import FormField from "@/components/wizard/FormField";

export const AddressStep = ({ values, onComplete, onBack }: any) => {
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
