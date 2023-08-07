"use client";

import { MenuIcon, TrashIcon } from "lucide-react";
import React, { useContext } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast/useToast";
import { TugasPanitiaContext } from "@/context/tugas-panitia-provider";
import { useTugasIndexStore } from "@/lib/store";
import { Tugas } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

async function getTugas() {
  const res = await fetch("/api/tugas");
  const data = await res.json();
  return data;
}

export default function DeleteTugas() {
  const { tugasIndex, setTugasIndex } = useTugasIndexStore();
  const { toast } = useToast();
  const initialData = useContext(TugasPanitiaContext);

  const tugas = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: () => getTugas(),
    refetchInterval: 1000 * 60 * 5, // 10 minutes
    initialData: initialData,
  });

  // Disabled for now
  const deleteTugas = useMutation({
    mutationKey: ["deleteTugas"],
    mutationFn: () => {
      if (!tugas.data) return Promise.reject("Tugas ID is undefined");

      return fetch(`/api/tugas/${tugas.data[tugasIndex].id}`, {
        method: "DELETE",
      });
    },
    onMutate: () => {
      toast({
        title: "Menghapus tugas...",
      });
    },
    onSuccess: () => {
      toast({
        title: "Tugas berhasil dihapus!",
      });

      tugas.refetch();
    },
    onSettled: () => {
      tugas.refetch();
    },
  });

  if (tugas.isLoading) {
    return (
      <Button disabled className="w-full">
        <MenuIcon className="w-max shrink-0 mr-2" />
      </Button>
    );
  }

  if (tugas.isError) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
        <MenuIcon className="w-max shrink-0 mr-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuItem className="hover:cursor-pointer" asChild>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="w-full">
                <TrashIcon className="w-max shrink-0 mr-2" size={16} />
                Hapus
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                Apakah kamu yakin ingin menghapus tugas{" "}
                {tugas.data[tugasIndex].title}?
              </AlertDialogHeader>
              <AlertDialogDescription>
                Tugas yang sudah dihapus tidak dapat dikembalikan, dan akan
                menghapus semua data yang berkaitan dengan tugas ini.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button
                    onClick={() =>
                      toast({
                        title: "Harap hubungi apip atau zydan yahehhehehe",
                      })
                    }
                  >
                    Hapus
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button>Batal</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
