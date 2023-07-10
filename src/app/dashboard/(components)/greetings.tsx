"use client";

import React from "react";

import { H1, P } from "@/components/typography";

function Greetings() {
  const time = new Date().getHours();

  if (time <= 11 && time > 6) return "Selamat Pagii!🌞";
  else if (time > 11 && time < 15) return "Selamat Siang!🌤️";
  else if (time < 18 && time > 15) return "Selamat Soree!🌤️";
  else return "Selamat Malam!🌙";
}

export default function GreetingsSection() {
  return (
    <div className="flex flex-col">
      <H1>{Greetings()}</H1>
      <P>Kamu bisa mengatur isi konten, akun peserta dan sebagainya di sini.</P>
    </div>
  );
}
