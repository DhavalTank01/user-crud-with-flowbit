import { useState, useEffect } from "react";
import CustomBreadcrumb from "../../../Components/CustomBreadcrumb";
import CustomButton from "../../../Components/Button";
import Input from "../../../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../axios";
import { APIS } from "../../../axios/apis";
import { getFormattedDate } from "../../../utils";
import toast from "react-hot-toast";
import { User } from "../../../types/User";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../redux/slice/userSlice";
import SingleDatePicker from "../../../Components/SingleDatePicker";
import CustomUserRoleBadge from "../../../Components/CustomUserRoleBadge";
import CustomUserStatusBadge from "../../../Components/CustomUserStatusBadge";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({} as User);
  const [isLoading, setIsLoading] = useState({
    pageLoading: true,
    updateActivityStatus: false,
  });
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      dob: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let payload = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          phone_number: values?.phone_number,
          dob: getFormattedDate(values?.dob, "YYYY-MM-DD"),
        };
        let response = await axiosInstance.put(
          APIS.UPDATE_USER(userDetails?.id),
          payload,
        );
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setUserDetails(response?.data?.user);
          dispatch(setCurrentUser(response?.data?.user));
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
      } finally {
        formik.resetForm();
        setIsEditing(false);
      }
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      phone_number: Yup.string().required(),
      dob: Yup.string().required(),
    }),
  });

  const getUserDetails = async () => {
    try {
      setIsLoading({ ...isLoading, pageLoading: true });
      let response = await axiosInstance.get(APIS.GET_CURRENT_USER);
      if (response?.status === 200) {
        let user = response?.data?.user;
        formik.setValues({
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone_number: user?.phone_number,
          dob: new Date(user?.dob).toString(),
        });
        setUserDetails(user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading({ ...isLoading, pageLoading: false });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    formik.setValues({
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      phone_number: userDetails?.phone_number,
      dob: new Date(userDetails?.dob).toString(),
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="">
      <CustomBreadcrumb pageTitle="Settings" pageSubTitle="My Profile" />
      <div className="">
        {isEditing ? (
          <form onSubmit={formik.handleSubmit} className="p-4">
            <div className="mb-4 flex w-60 flex-col flex-wrap justify-start gap-4">
              <Input
                id="first_name"
                name="first_name"
                label="First Name"
                type="text"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.first_name)}
                helperText={formik.errors.first_name}
              />
              <Input
                id="last_name"
                name="last_name"
                label="Last Name"
                type="text"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.last_name)}
                helperText={formik.errors.last_name}
              />
              <Input
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                type="text"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.phone_number)}
                helperText={formik.errors.phone_number}
              />
              <SingleDatePicker
                label="Date of Birth"
                name="dob"
                id="dob"
                value={
                  !!formik.values.dob ? new Date(formik.values.dob) : new Date()
                }
                onChange={(e: any) => {
                  formik.setFieldValue("dob", e);
                }}
                onBlur={formik.handleBlur}
                maxDate={new Date()}
                error={!!formik.errors.dob}
                helperText={formik.errors.dob}
              />
            </div>
            <CustomButton
              type="submit"
              isLoading={formik.isSubmitting}
              disabled={!formik.isValid}
            >
              Update
            </CustomButton>
          </form>
        ) : (
          <div className="p-4">
            <div></div>
            <div className="flex justify-between">
              <div>My details</div>
              <CustomButton onClick={() => handleEditClick()}>
                Edit
              </CustomButton>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <div>
                  <p className="mb-2">
                    <strong>First Name:</strong> {userDetails.first_name}
                  </p>
                  <p className="mb-2">
                    <strong>Last Name:</strong> {userDetails.last_name}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Phone Number:</strong> {userDetails.phone_number}
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> {userDetails.email}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p className="mb-2">
                    <strong>Date of Birth:</strong>{" "}
                    {getFormattedDate(userDetails.dob)}
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex gap-2">
                    <strong>Last Login:</strong>{" "}
                    {getFormattedDate(
                      userDetails.last_login,
                      "DD/MM/YYYY hh:mm:ss A",
                    )}
                  </div>
                  <div className="mb-2 flex gap-2">
                    <strong>Role:</strong>{" "}
                    <CustomUserRoleBadge user={userDetails} />
                  </div>
                  <div className="mb-2 flex gap-2">
                    <strong>Status:</strong>{" "}
                    <CustomUserStatusBadge user={userDetails} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
