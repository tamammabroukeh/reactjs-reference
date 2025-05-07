import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepForm from "@/components/wizard/StepForm";
export const ReviewStep = ({ values, onComplete, onBack, isLastStep }: any) => {
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
