import * as yup from "yup";

const addGymSchema = yup
  .object({
    ownerName: yup.string().required("Required field"),
    email: yup.string().email("Is invalid email").required("Required field"),
    name: yup.string().required("Required field"),
    address: yup.string().required("Required field"),
    phone: yup
      .number()
      .typeError("Is invalid number")
      .required("Required field"),
    price: yup.string().required("Required field"),
  })
  .required();
export default addGymSchema;