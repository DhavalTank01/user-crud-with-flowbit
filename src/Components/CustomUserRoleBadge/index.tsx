import { Badge } from "flowbite-react";
import React from "react";
import { User } from "../../types/User";
import { HiUser } from "react-icons/hi";
import { convertTextCase } from "../../utils";

const CustomUserRoleBadge = ({ user }: { user: User }) => {
  return (
    <Badge
      className="w-min"
      color={
        user?.is_disabled ? "red" : user.role === "admin" ? "blue" : "gray"
      }
      icon={HiUser}
    >
      {convertTextCase(user.role, "titlecase")}
    </Badge>
  );
};

export default CustomUserRoleBadge;
