import { VerifiedUser, CreditCard, Check } from "@mui/icons-material";
import { MultiStepForm } from "./MultiStepForm";
import { Step } from "./Step";
const steps = [
  {
    id: "personal",
    label: "Personal",
    icon: <VerifiedUser className="w-5 h-5" />,
  },
  { id: "billing", label: "Billing", icon: <CreditCard className="w-5 h-5" /> },
  { id: "confirm", label: "Confirm", icon: <Check className="w-5 h-5" /> },
];

export default function Steps() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };
  return (
    <MultiStepForm steps={steps} onSubmit={handleSubmit}>
      <Step>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* More fields... */}
        </div>
      </Step>

      <Step>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Billing Information</h2>
          {/* Billing form fields... */}
        </div>
      </Step>

      <Step>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Confirmation</h2>
          {/* Review information... */}
        </div>
      </Step>
    </MultiStepForm>
  );
}
