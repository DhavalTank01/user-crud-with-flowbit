import React from "react";
import type { User } from "../../types/User";
import { Avatar } from "flowbite-react";
import { getFullName } from "../../utils";
import "./userAvatar.css";

const UserAvatar = ({ user }: { user: User }) => {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  }

  function getContrastingColor(color: string) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 186 ? "#000000" : "#FFFFFF";
  }

  const backgroundColor = stringToColor(getFullName(user));
  const textColor = getContrastingColor(backgroundColor);

  const avatarStyle = {
    "--avatar-background-color": backgroundColor,
    "--avatar-text-color": textColor,
  } as React.CSSProperties;

  return (
    <Avatar
      placeholderInitials={stringAvatar(getFullName(user))}
      style={avatarStyle}
      rounded
      status={user?.activity_status || "offline"}
    />
  );
};

export default UserAvatar;
