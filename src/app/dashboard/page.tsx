import React from "react";

import { H1 } from "@/components/typography";

function Greetings() {
  const time = new Date().getHours();

  if (time < 12) return "Selamat Pagii!🌞";
  else if (time < 18) return "Selamat Soree!🌤️";
  else return "Selamat Malam!🌙";
}

export default function Dashboard() {
  return (
    <>
      <H1>{Greetings()}</H1>
    </>
  );
}
