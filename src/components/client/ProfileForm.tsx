"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const { user } = useAuth();

  const {
    register,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">프로필</h2>
        <div className="space-y-2">
          <p>
            <strong>이메일:</strong> {user?.email}
          </p>
          <p>
            <strong>성별:</strong> {user?.gender}
          </p>
          <p>
            <strong>키:</strong> {user?.height} cm
          </p>
          <p>
            <strong>몸무게:</strong> {user?.weight} kg
          </p>
        </div>

        {/* 기록 입력 폼 */}
        {/* <h3 className="text-xl font-semibold mt-6 mb-2">달리기 기록 입력</h3>
        <form className="space-y-4">
          <div>
            <label className="block">5K 기록 (분:초)</label>
            <input
              type="text"
              {...register("record5k")}
              className="w-full p-2 border rounded"
              placeholder="예: 25:30"
            />
          </div>
          <div>
            <label className="block">10K 기록 (분:초)</label>
            <input
              type="text"
              {...register("record10k")}
              className="w-full p-2 border rounded"
              placeholder="예: 55:00"
            />
          </div>
          <div>
            <label className="block">하프 (21.1K) 기록 (시간:분:초)</label>
            <input
              type="text"
              {...register("recordHalf")}
              className="w-full p-2 border rounded"
              placeholder="예: 2:05:30"
            />
          </div>
          <div>
            <label className="block">풀코스 (42.195K) 기록 (시간:분:초)</label>
            <input
              type="text"
              {...register("recordFull")}
              className="w-full p-2 border rounded"
              placeholder="예: 4:30:00"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
          >
            기록 저장
          </button>
        </form> */}
      </div>
    </div>
  );
}
