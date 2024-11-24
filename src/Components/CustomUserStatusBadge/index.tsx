import React from "react";
import { User } from "../../types/User";
import { Badge } from "flowbite-react";

const CustomUserStatusBadge = ({ user }: { user: User }) => {
  return (
    <Badge
      className="w-min"
      color={user?.is_disabled ? "failure" : "success"}
      size="sm"
    >
      {user?.is_disabled ? "Inactive" : "Active"}
    </Badge>
  );
};

export default CustomUserStatusBadge;
