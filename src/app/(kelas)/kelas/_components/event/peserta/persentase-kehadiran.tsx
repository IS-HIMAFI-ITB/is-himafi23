"use client";

import { Loader2Icon } from "lucide-react";
import { useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { AcaraContext } from "@/context/acara-provider";
import { useEventQuery } from "@/hooks/useEventQuery";

export default function PersentaseKehadiran() {
  const initialData = useContext(AcaraContext);
  const events = useEventQuery({ initialData });

  if (!events) return null;
  if (events.isLoading)
    return (
      <Badge variant={"default"}>
        <Loader2Icon className="animate-spin inline mr-1" size={16} />% /{" "}
        <Loader2Icon className="animate-spin inline mx-1" size={16} />%
      </Badge>
    );
  if (events.isError) return <Badge variant={"destructive"}>Error!</Badge>;

  const safeRatio = Number(events.persentaseKehadiranRelatif) > 75;

  return (
    <Badge variant={safeRatio ? "default" : "destructive"}>
      {events.persentaseKehadiranAbsolut}% / {events.persentaseKehadiranRelatif}
      %
    </Badge>
  );
}
