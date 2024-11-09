import React from "react";
import type { User } from "../../types/User";
import { Avatar } from "flowbite-react";
import { convertTextCase, getFullName } from "../../utils";

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar
      placeholderInitials={convertTextCase(getFullName(user), "initialLetters")}
      rounded
    />
  );
};

export default UserAvatar;
