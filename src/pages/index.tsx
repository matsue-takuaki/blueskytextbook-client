import SignIn from "@/components/SignIn";

export default function Home() {
  return (
    <div className="h-screen bg-white">
      <div className="pt-24">
        <h1 className="text-center text-teal-300 text-5xl font-bold">
          青空教科書
        </h1>
      </div>
      <div className="text-center mt-32">
        <div className="mt-56">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
