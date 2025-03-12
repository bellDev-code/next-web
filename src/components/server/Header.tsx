import LoginButtonWrapper from "@/components/client/LoginButtonWrapper";

export default function Header() {
  return (
    <header className="w-full p-4 bg-gray-100 shadow-md fixed">
      <div className="container mx-auto flex justify-end">
        <LoginButtonWrapper />
      </div>
    </header>
  );
}
