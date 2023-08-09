"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    nama: z.string().nonempty("Nama tidak boleh kosong"),
    nickname: z.string().nonempty("Nama panggilan tidak boleh kosong"),
    nim: z.union([
      z.coerce
        .number()
        .gte(10221000, "Format NIM salah")
        .lte(10222150, "Format NIM salah"),
      z.coerce
        .number()
        .gte(16022001, "Format NIM salah")
        .lte(16022999, "Format NIM salah"),
    ]),
    tinggal: z.enum(["rumah", "kos", "asrama", "other"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    keteranganTinggal: z.string().optional(),
    kondisiTubuh: z.enum(
      ["sehat", "kurang fit", "sakit", "baru sembuh", "other"],
      {
        required_error: "Pilihan tidak boleh kosong",
      }
    ),
    keteranganKondisiTubuh: z.string().optional(),
    penyakit: z.enum(["ya", "tidak"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    keteranganPenyakit: z.string().optional(),
    obatKhusus: z.enum(["ya", "tidak", "mungkin"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    siapDay: z.enum(["1", "2", "3", "4", "5"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    siapSpek: z.enum(["belum", "belum lengkap", "sudah lengkap"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    bahanPraDay: z.enum(["belum", "sudah sedikit", "sudah semuanya"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    pahamPraDay: z.enum(["1", "2", "3", "4", "5"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    ekspektasiDay: z.enum(["afraid", "nervous", "chaos", "biasa", "semangat"], {
      required_error: "Pilihan tidak boleh kosong",
    }),
    opiniDay: z.string().nonempty("Jawaban tidak boleh kosong"),
    saranDay: z.string().nonempty("Jawaban tidak boleh kosong"),
  })
  .superRefine(
    (
      { tinggal, keteranganTinggal, kondisiTubuh, keteranganKondisiTubuh },
      ctx
    ) => {
      if (tinggal === "other" && !keteranganTinggal) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Harus dicantumkan keterangan",
          path: ["keteranganTinggal"],
        });
      }

      if (kondisiTubuh === "other" && !keteranganKondisiTubuh) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Harus dicantumkan keterangan",
          path: ["keteranganKondisiTubuh"],
        });
      }
    }
  );

type FormContextType = {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

const FormContext = React.createContext<FormContextType | null>(null);

export const useFormPreday = () => {
  const formContext = React.useContext(FormContext);

  if (!formContext) {
    throw new Error("useFormPreday must be used within FormProvider");
  }

  return formContext;
};

export default function FormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <FormContext.Provider value={{ form, onSubmit }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {children}
        </form>
      </Form>
    </FormContext.Provider>
  );
}
