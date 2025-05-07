import { AccountSecurityStep } from "@/components/new-multi-form/AccountSecuritStep";
import { AddressStep } from "@/components/new-multi-form/AddressStep";
import { PersonalInfoStep } from "@/components/new-multi-form/PersonalInfoStep";
import { ReviewStep } from "@/components/new-multi-form/ReviewStep";
import { StepConfig } from "@/components/wizard/StepWizard";
import { PasswordRule } from "@/interfaces/shared";
import { AccountSecuritySchema } from "@/schemas/AccountSecuritySchema";
import { AddressSchema } from "@/schemas/Addresschema";
import { PersonalInfoSchema } from "@/schemas/PersonalInfoSchema";
import { User, Lock, Mail, Home } from "lucide-react";

export const steps: StepConfig[] = [
  {
    id: "personal",
    label: "Personal",
    icon: <User className="h-5 w-5" />,
    content: PersonalInfoStep,
    validationSchema: PersonalInfoSchema,
  },
  {
    id: "security",
    label: "Security",
    icon: <Lock className="h-5 w-5" />,
    content: AccountSecurityStep,
    validationSchema: AccountSecuritySchema,
  },
  {
    id: "address",
    label: "Address",
    icon: <Home className="h-5 w-5" />,
    content: AddressStep,
    validationSchema: AddressSchema,
  },
  {
    id: "review",
    label: "Review",
    icon: <Mail className="h-5 w-5" />,
    content: ReviewStep,
  },
];

export const DEFAULT_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters",
    validator: (value) => value.length >= 8,
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    validator: (value) => /[a-z]/.test(value),
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    validator: (value) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "At least one number",
    validator: (value) => /\d/.test(value),
  },
  {
    id: "special",
    label: "At least one special character",
    validator: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
  },
];
