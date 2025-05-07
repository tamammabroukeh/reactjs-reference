import * as Yup from "yup";

const AddressSchema = Yup.object().shape({
  street: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string()
    .required("ZIP code is required")
    .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
});
export { AddressSchema };
