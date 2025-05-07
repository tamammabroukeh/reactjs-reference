export interface IChildren {
  children: React.ReactNode;
}
export interface Step {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
export interface StepChildProps {
  isActive?: boolean;
  updateFormData?: (data: Record<string, any>) => void;
  formData?: Record<string, any>;
  children?: React.ReactNode;
}
export interface StepFormProps {
  steps: Step[];
  initialStep?: number;
  activeColor?: string;
  completedColor?: string;
  inactiveColor?: string;
  children: React.ReactNode[];
  onSubmit: () => void;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export interface PasswordRule {
  id: string;
  label: string;
  validator: (value: string) => boolean;
}

export interface PasswordFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  showStrengthIndicator?: boolean;
  required?: boolean;
  rules?: PasswordRule[];
}
