import CompleteProfile from "./(components)/complete-profile";

export default function Home() {
  return (
    <section className="h-full w-full bg-contain">
      <div className="h-screen flex flex-col justify-center items-center md:items-end">
        <CompleteProfile className="shrink md:shrink-0 md:w-[600px] md:h-screen" />
      </div>
    </section>
  );
}
