"use client";

import { getWeather } from "@/lib/api/weather";
import { useEffect, useState } from "react";

export default function WeatherComponent() {
  const [weather, setWeather] = useState<{
    T1H: string | null;
    UUU: string | null;
    VVV: string | null;
    WSD: string | null;
    SKY: string | null;
    PTY: string | null;
    POP: string | null;
    REH: string | null;
  } | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeather();
      setWeather(data);

      console.log(data);
    }
    fetchWeather();
  }, []);

  if (!weather)
    return <div className="text-white">날씨 정보를 불러오는 중...</div>;

  // 하늘 상태 변환
  const skyStatus: Record<string, string> = {
    "1": "☀️ 맑음",
    "3": "⛅ 구름 많음",
    "4": "☁️ 흐림",
  };

  // 강수 형태 변환
  const precipitationType: Record<string, string> = {
    "0": "☀️ 없음",
    "1": "🌧️ 비",
    "2": "🌨️ 비/눈",
    "3": "❄️ 눈",
    "4": "⛈️ 소나기",
  };

  return (
    <div className="flex flex-col bg-black p-6 w-[500px] text-center rounded-lg text-white">
      <h1 className="font-extrabold text-2xl mb-4">🌤 실시간 기상 정보</h1>
      <p>🌡️ 기온: {weather.T1H ?? "데이터 없음"} °C</p>
      <p>💨 동서바람: {weather.UUU ?? "데이터 없음"} m/s</p>
      <p>💨 남북바람: {weather.VVV ?? "데이터 없음"} m/s</p>
      <p>🌬️ 풍속: {weather.WSD ?? "데이터 없음"} m/s</p>
      <p>🌤️ 하늘 상태: {skyStatus[weather.SKY ?? ""] ?? "알 수 없음"}</p>
      <p>
        🌧️ 강수 형태: {precipitationType[weather.PTY ?? ""] ?? "알 수 없음"}
      </p>
      <p>☔ 강수 확률: {weather.POP ?? "데이터 없음"} %</p>
      <p>💦 습도: {weather.REH ?? "데이터 없음"} %</p>
    </div>
  );
}
