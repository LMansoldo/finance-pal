export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  register: (user: User) => boolean;
  logout: () => void;
}
