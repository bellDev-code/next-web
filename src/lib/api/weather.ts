const SERVICE_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL!;

// 기상청이 제공하는 base_time 목록 (1시간 단위)
const BASE_TIMES = [
  "0200",
  "0500",
  "0800",
  "1100",
  "1400",
  "1700",
  "2000",
  "2300",
];

// 현재 시간 기준 가장 가까운 base_time 찾기
const getBaseTime = () => {
  const now = new Date();
  now.setMinutes(0, 0, 0); // 분과 초 초기화
  let currentHour = now.getHours();

  // 가장 가까운 base_time 찾기 (기상청 제공 시간 기준)
  let selectedBaseTime = BASE_TIMES.findLast(
    (t) => parseInt(t) <= currentHour * 100
  );

  if (!selectedBaseTime) {
    // 새벽 2시 이전이면, 전날 2300 데이터 사용
    selectedBaseTime = "2300";
    now.setDate(now.getDate() - 1);
  }

  console.log("현재 시각:", now.toISOString());
  console.log("선택된 base_time:", selectedBaseTime);

  return {
    baseDate: now.toISOString().split("T")[0].replace(/-/g, ""), // YYYYMMDD
    baseTime: selectedBaseTime,
  };
};

// 필요한 기상 요소 목록
const WEATHER_CATEGORIES = [
  "TMP", // 기온 (°C)
  "UUU", // 동서 바람성분 (m/s)
  "VVV", // 남북 바람성분 (m/s)
  "WSD", // 풍속 (m/s)
  "SKY", // 하늘 상태 (1~4: 맑음~흐림)
  "PTY", // 강수 형태 (0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기)
  "POP", // 강수 확률 (%)
  "REH", // 습도 (%)
];

export async function getWeather(nx = 54, ny = 125) {
  const { baseDate, baseTime } = getBaseTime();

  const queryParams = new URLSearchParams({
    serviceKey: decodeURIComponent(SERVICE_KEY),
    numOfRows: "100",
    pageNo: "1",
    dataType: "JSON",
    base_date: baseDate,
    base_time: baseTime,
    nx: nx.toString(),
    ny: ny.toString(),
  });

  const url = `${BASE_URL}?${queryParams.toString()}`;
  console.log("API 요청 URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("📌 API 응답 데이터:", data);

    if (!data.response || data.response.header.resultCode !== "00") {
      console.error("기상청 API 응답 오류:", data.response.header);
      return null;
    }

    const items = data.response.body.items.item;
    console.log("📌 API 데이터 목록:", items);

    // 현재 시간에 가장 가까운 fcstTime 찾기
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM 형식
    console.log("현재 시각 (HHMM):", currentTime);

    // 가장 가까운 fcstTime 선택
    const getClosestFcstValue = (category: string) => {
      const foundItems = items
        .filter((item: any) => item.category === category)
        .sort(
          (a: any, b: any) =>
            Math.abs(a.fcstTime - currentTime) -
            Math.abs(b.fcstTime - currentTime)
        );

      return foundItems.length > 0 ? foundItems[0].fcstValue : null;
    };

    // 필요한 데이터만 추출
    const weatherData = WEATHER_CATEGORIES.reduce(
      (acc, category) => {
        acc[category as keyof typeof acc] = getClosestFcstValue(category);
        return acc;
      },
      {
        TMP: null,
        UUU: null,
        VVV: null,
        WSD: null,
        SKY: null,
        PTY: null,
        POP: null,
        REH: null,
      } as {
        TMP: string | null;
        UUU: string | null;
        VVV: string | null;
        WSD: string | null;
        SKY: string | null;
        PTY: string | null;
        POP: string | null;
        REH: string | null;
      }
    );

    return weatherData;
  } catch (error) {
    console.error("기상청 API 오류:", error);
    return null;
  }
}
