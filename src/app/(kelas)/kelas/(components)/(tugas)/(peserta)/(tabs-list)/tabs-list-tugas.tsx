import React from "react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import TugasAssignedRatio from "./tugas-assigned-ratio";
import TugasDoneRatio from "./tugas-done-ratio";

export default function TabsListTugas() {
  return (
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="assigned">
        🕒 Ditugaskan
        <span className="ml-1 xs:inline hidden">
          <TugasAssignedRatio />
        </span>
      </TabsTrigger>

      <TabsTrigger value="done">
        ✅ Selesai
        <span className="ml-1 xs:inline hidden">
          <TugasDoneRatio />
        </span>
      </TabsTrigger>
    </TabsList>
  );
}
