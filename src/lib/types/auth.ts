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
