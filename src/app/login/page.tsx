import Image from "next/image";
import LoginCard from "@/components/LoginCard";


export default function Home() {
  return (
    <body className="bg-slate-600 h-full w-full bg-contain">
      {/* Desktop Navigation */}
      <div className="hidden h-screen md:flex flex-col justify-center items-end">
        <LoginCard className="w-[600px] h-screen"/>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden h-screen flex flex-col justify-center items-center">
        <LoginCard className="shrink"/>
      </div>
    </body>
  )
}
