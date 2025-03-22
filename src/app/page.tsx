import WeatherComponent from "@/components/client/WeatherComponent";

export const metadata = {
  title: "Run Run Web",
};

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center pt-13">
      <WeatherComponent />
    </div>
  );
}
