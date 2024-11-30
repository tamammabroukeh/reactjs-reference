import { z } from "zod";
const firstnameErrorMessage = "First name must be at least 3 characters long";
const lastNameErrorMessage = "Last name must be at least 3 characters long";
const emailErrorMessage = "Username must be at least 3 characters long";
const passwordErrorMessage = "Password must be at least 8 characters long";
const RegisterSchema = z.object({
  firstname: z
    .string({ required_error: firstnameErrorMessage })
    .min(3, { message: firstnameErrorMessage }),
  lastname: z
    .string({ required_error: lastNameErrorMessage })
    .min(3, { message: lastNameErrorMessage }),
  email: z
    .string({ required_error: emailErrorMessage })
    .min(3, { message: emailErrorMessage })
    .email(),
  password: z
    .string({ required_error: passwordErrorMessage })
    .min(8, { message: passwordErrorMessage })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
});

type RegisterType = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type RegisterType };
