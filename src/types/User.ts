import { Role } from "./Role";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  dob: string;
  role: Role;
  is_disabled: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  last_login: string;
  profile_image?: string | null;
  profile_image_id?: string | null;
  activity_status?: "away" | "busy" | "offline" | "online";
  role_id: number | string;
}

export interface AuthState {
  user: User | null | undefined;
  isAuthenticated: boolean;
}

export interface UserSetAction {
  user: User;
  token: string;
  backupToken?: string;
}
