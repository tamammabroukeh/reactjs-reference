import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const SuccessStep = ({ values }: any) => {
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
