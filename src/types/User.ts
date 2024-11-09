export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
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
