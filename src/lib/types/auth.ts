export interface SignUpData {
  email: string;
  password: string;
  confirmPassword?: string;
  gender: "male" | "female" | "other";
  height: number;
  weight: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export type User = {
  id: string;
  email: string;
  gender: string;
  height: number;
  weight: number;
  createdAt: string;
};
