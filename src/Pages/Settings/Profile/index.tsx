import React, { useState, useEffect } from "react";
import ComingSoon from "../../../Components/ComingSoon";
import CustomBreadcrumb from "../../../Components/CustomBreadcrumb";
import CustomButton from "../../../Components/Button";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: 1,
    email: "test1@yopmail.com",
    first_name: "Dhaval",
    last_name: "Tank",
    phone_number: "1122334455",
    dob: "2001-07-04T00:00:00.000Z",
    role: "client",
    is_disabled: false,
    is_deleted: false,
    profile_image: null,
  });

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submit to update the profile
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can call an API to update the user profile
    console.log("Updated user details:", userDetails);
    setIsEditing(false);
  };

  return (
    <div className="my-profile-container">
      <CustomBreadcrumb pageTitle="Settings" pageSubTitle="My Profile" />
      <div className="content-wrapper">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={userDetails.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={userDetails.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={userDetails.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={userDetails.dob.slice(0, 10)} // format the date to YYYY-MM-DD
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-submit">
                Update
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4">
            <div className="flex justify-between">
              <div>My details</div>
              <CustomButton onClick={() => setIsEditing(true)}>
                Edit
              </CustomButton>
            </div>
            <div className="flex grid-rows-subgrid flex-wrap gap-4">
              <div>
                <strong>Email:</strong> {userDetails.email}
              </div>
              <div>
                <strong>First Name:</strong> {userDetails.first_name}
              </div>
              <div>
                <strong>Last Name:</strong> {userDetails.last_name}
              </div>
              <div>
                <strong>Phone Number:</strong> {userDetails.phone_number}
              </div>
              <div>
                <strong>Date of Birth:</strong>{" "}
                {new Date(userDetails.dob).toLocaleDateString()}
              </div>
              <div>
                <strong>Role:</strong> {userDetails.role}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                {userDetails.is_disabled ? "Disabled" : "Active"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
