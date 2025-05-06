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
