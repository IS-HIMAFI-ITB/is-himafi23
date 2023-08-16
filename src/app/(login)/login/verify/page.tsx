import React from "react";

import Loading from "@/components/template/loading";

export default function VerifyLogin() {
  // Selagi ngecek session yang barusan login, tampilkan loading.
  return (
    <div className="bg-pastBackground bg-cover">
      <Loading />
    </div>
  );
}
