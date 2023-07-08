import CompleteProfile from "./(components)/complete-profile";

export default function Home() {
  return (
    <section className="bg-slate-600 h-full w-full bg-contain">
      {/* Desktop Navigation */}
      <div className="hidden h-screen md:flex flex-col justify-center items-end order-last">
        <CompleteProfile className="w-[600px] h-screen" />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden h-screen flex flex-col justify-center items-center">
        <CompleteProfile className="shrink" />
      </div>
    </section>
  );
}
