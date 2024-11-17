import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import Input from "../../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "../../types/User";
import SingleDatePicker from "../../Components/SingleDatePicker";
import CustomButton from "../../Components/Button";

const AddUser = () => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      dob: "",
      email: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      phone_number: Yup.string().min(10).max(13).required(),
      dob: Yup.string().required(),
      email: Yup.string().email().required(),
      role: Yup.string().required(),
    }),
    onSubmit: (values) => {
      addUser(values as User);
    },
  });
  const addUser = async (user: User) => {
    try {
      console.log("user: ", user);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div>
      <CustomBreadcrumb pageTitle="Add User" />
      <div className="w-80 p-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            name="first_name"
            placeholder="First name"
            id="first_name"
            label="First name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            error={!!formik.errors.first_name}
            helperText={formik.errors.first_name}
          />
          <Input
            name="last_name"
            placeholder="Last name"
            id="last_name"
            label="Last name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
            error={!!formik.errors.last_name}
            helperText={formik.errors.last_name}
          />
          <Input
            name="email"
            placeholder="Email"
            id="email"
            label="Email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
          />
          <Input
            name="phone_number"
            placeholder="Phone number"
            id="phone_number"
            label="Phone number"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_number}
            error={!!formik.errors.phone_number}
            helperText={formik.errors.phone_number}
          />
          <SingleDatePicker
            label="Date of Birth"
            name="dob"
            id="dob"
            value={!!formik.values.dob ? new Date(formik.values.dob) : null}
            onChange={(e: any) => {
              formik.setFieldValue("dob", e);
            }}
            onBlur={formik.handleBlur}
            maxDate={new Date()}
            error={!!formik.errors.dob}
            helperText={formik.errors.dob}
          />
          <div className="flex justify-between align-middle">
            <CustomButton type="submit">Add User</CustomButton>
            <CustomButton type="button" color="light">
              Cancel
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
