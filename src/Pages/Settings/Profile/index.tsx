import React from "react";
import ComingSoon from "../../../Components/ComingSoon";
import CustomBreadcrumb from "../../../Components/CustomBreadcrumb";

const MyProfile = () => {
  return (
    <div>
      <CustomBreadcrumb pageTitle="Settings" pageSubTitle="My Profile" />
      <ComingSoon title="My Profile" />
    </div>
  );
};

export default MyProfile;
