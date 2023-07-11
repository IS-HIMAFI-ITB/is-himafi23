import LoginCard from "./(components)/login-card";

export default function Home() {
  return (
    <section className="h-full w-full bg-contain">
      <div className="h-screen flex flex-col justify-center items-center md:items-end">
        <LoginCard className="shrink md:shrink-0 md:w-[600px] md:h-screen" />
      </div>
    </section>
  );
}
