import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력하세요.")
      .email("올바른 이메일 형식을 입력하세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female", "other"], {
      required_error: "성별을 선택하세요.",
    }),
    height: z
      .number()
      .min(50, "신장을 입력하세요.")
      .max(250, "정확한 신장을 입력하세요."),
    weight: z
      .number()
      .min(20, "몸무게는 20kg 이상이어야 합니다.")
      .max(300, "몸무게는 300kg 이하로 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
