"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "@/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, H3 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Unauthenticated from "@/components/template/unauthenticated";
import Loading from "@/components/template/loading";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/useToast";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

export default function FormPage({ params }: { params: { eventId: string } }) {
  const { data, status } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // ini ntar diganti buat submit
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

  if (status === "unauthenticated") return <Unauthenticated />;
  if (status === "loading") return <Loading />;

  //(TW: panjang)
  return (
    <Container className="flex flex-col gap-4">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>CHECK & RE-CHECK PRA-DAY {params.eventId}</CardTitle>
          <CardDescription>{`Halo, massa Fisika'22 ^^`}</CardDescription>
          <CardDescription>
            Bagaimana kabar kalian selama liburan kuliah ini? <br /> Siap untuk
            menghadapi kehidupan di jurusan? <br /> Semoga selalu sehat dan
            selalu semangat mengikuti rangkaian kegiatan Intellektuelle Schule
            2023 ini yaaa...
          </CardDescription>
          <CardDescription>
            Narahubung: <br />
            (kontak 1) <br />
            (kontak 2) <br />
          </CardDescription>
          <Separator />
          <div className="flex gap-2 text-sm">
            <p className="text-accent">You are now logged in as: </p>
            <p className="font-semibold">
              {data?.user.name} ({data?.user.nim})
            </p>
          </div>
        </CardHeader>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          {/* Nama Lengkap (input) */}
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Nama Panggilan (input) */}
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>Nama Panggilan</FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* NIM Jurusan (input) */}
          <FormField
            control={form.control}
            name="nim"
            render={({ field }) => (
              <FormItem>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>NIM Jurusan</FormLabel>
                    <FormDescription className="text-xs -mt-2">
                      Contoh: 10222000
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Tempat Tinggal (select w/other) */}
          <FormField
            control={form.control}
            name="tinggal"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>Dimana kamu tinggal selama kuliah?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="rumah" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Rumah (sendiri, saudara, dan lainnya)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="kos" />
                          </FormControl>
                          <FormLabel className="font-normal">Kos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="asrama" />
                          </FormControl>
                          <FormLabel className="font-normal">Asrama</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal flex gap-2 items-center">
                            <p>Other: </p>
                            <FormField
                              control={form.control}
                              name="keteranganTinggal"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Berikan keterangan"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          <Card className="bg-background/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-primary text-black p-2 px-6 mb-4">
              <CardTitle className="text-lg">
                {`CEK KONDISI KESEHATAN & RIWAYAT PENYAKIT PRA-DAY ${params.eventId}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Untuk mengetahui kondisi kalian, harap isi form ini dengan
                sebenar-benarnya ya untuk mengantisipasi hal-hal yang tidak
                diinginkan selama keberjalanan day.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Kondisi Tubuh (select w/other) */}
          <FormField
            control={form.control}
            name="kondisiTubuh"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Bagaimana kondisi tubuh kalian saat ini?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sehat" />
                          </FormControl>
                          <FormLabel className="font-normal">Sehat</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="kurang fit" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Kurang fit
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sakit" />
                          </FormControl>
                          <FormLabel className="font-normal">Sakit</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="baru sembuh" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Baru sembuh dari sakit
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal flex gap-2 items-center">
                            <p>Other: </p>
                            <FormField
                              control={form.control}
                              name="keteranganKondisiTubuh"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Berikan keterangan"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Riwayat Penyakit (select) */}
          <FormField
            control={form.control}
            name="penyakit"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Apakah ada penyakit tertentu yang menyulitkan kalian
                      mengikuti rangkaian acara day?
                    </FormLabel>
                    <FormDescription className="text-xs -mt-2">
                      Misal : tiba-tiba sesak nafas, dll
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ya" />
                          </FormControl>
                          <FormLabel className="font-normal">Ya</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="tidak" />
                          </FormControl>
                          <FormLabel className="font-normal">Tidak</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Keterangan Riwayat Penyakit (input) */}
          <FormField
            control={form.control}
            name="keteranganPenyakit"
            render={({ field }) => (
              <FormItem>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Jika ada, bolehkah kami tahu lebih spesifik tentang
                      kondisi kalian? tolong jelaskan dengan rinci
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Obat-obatan khusus (select) */}
          <FormField
            control={form.control}
            name="obatKhusus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Apakah ada obat-obatan khusus yang rutin diminum?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ya" />
                          </FormControl>
                          <FormLabel className="font-normal">Ya</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="tidak" />
                          </FormControl>
                          <FormLabel className="font-normal">Tidak</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mungkin" />
                          </FormControl>
                          <FormLabel className="font-normal">Mungkin</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          <Card className="bg-background/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-primary text-black p-2 px-6 mb-4">
              <CardTitle className="text-lg">
                {`CEK KESIAPAN MENGIKUTI DAY ${params.eventId}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Halo, semua! <br />
                Apakah kalian sudah siap untuk mengikuti rangkaian acara Day 0?{" "}
                <br />
                Langsung jawab pertanyaan-pertanyaan berikut dengan
                sejujur-jujurnya ya...
              </CardDescription>
            </CardContent>
          </Card>

          {/* Siap Day (linear scale) */}
          <FormField
            control={form.control}
            name="siapDay"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      {`Apakah kalian sudah siap untuk mengikuti Day ${params.eventId}
                      Intellektuelle Schule HIMAFI 2023?`}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-row items-center gap-6 justify-center"
                      >
                        <p className="text-xs ">Sangat tidak siap</p>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal ">1</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">2</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="3" />
                          </FormControl>
                          <FormLabel className="font-normal">3</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="4" />
                          </FormControl>
                          <FormLabel className="font-normal">4</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="5" />
                          </FormControl>
                          <FormLabel className="font-normal">5</FormLabel>
                        </FormItem>
                        <p className="text-xs">Sangat siap</p>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Siap spek (select) */}
          <FormField
            control={form.control}
            name="siapSpek"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Apakah kalian sudah mempersiapkan spek yang dibutuhkan
                      untuk day nanti?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="belum" />
                          </FormControl>
                          <FormLabel className="font-normal">Belum</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="belum lengkap" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Sudah, tapi belum lengkap
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sudah lengkap" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Sudah lengkap dong
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Bahan Pra-Day (select) */}
          <FormField
            control={form.control}
            name="bahanPraDay"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Apakah kalian sudah melihat bahan Pra-Day yang diberikan
                      oleh panitia?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="belum" />
                          </FormControl>
                          <FormLabel className="font-normal">Belum</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sudah sedikit" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Sudah lihat sedikit
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sudah semuanya" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Sudah lihat keseluruhannya
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Paham Pra-Day (linear scale) */}
          <FormField
            control={form.control}
            name="pahamPraDay"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      {`Apakah kalian sudah siap untuk mengikuti Day ${params.eventId}
                      Intellektuelle Schule HIMAFI 2023?`}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-row items-center gap-6 justify-center"
                      >
                        <p className="text-xs ">Tidak Paham</p>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal ">1</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">2</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="3" />
                          </FormControl>
                          <FormLabel className="font-normal">3</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="4" />
                          </FormControl>
                          <FormLabel className="font-normal">4</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col  items-center">
                          <FormControl>
                            <RadioGroupItem value="5" />
                          </FormControl>
                          <FormLabel className="font-normal">5</FormLabel>
                        </FormItem>
                        <p className="text-xs">Sangat Paham</p>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          <Card className="bg-background/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-primary text-black p-2 px-6 mb-4">
              <CardTitle className="text-lg">
                {`EKSPEKTASI TERHADAP DAY ${params.eventId} INTELLEKTUELLE SCHULE HIMAFI 2023`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Halo haloo. Terakhiran nih, jawab pertanyaan-pertanyaan di bawah
                ini dengan ekspektasi kalian terhadap Day 0 yang akan
                dilaksanakan yaaa..
              </CardDescription>
            </CardContent>
          </Card>

          {/* Ekspektasi Day (select) */}
          <FormField
            control={form.control}
            name="ekspektasiDay"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      {`Bagaimana perasaan kalian menjelang Day ${params.eventId} ini?`}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange as any}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="afraid" />
                          </FormControl>
                          <FormLabel className="font-normal">Afraid</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="nervous" />
                          </FormControl>
                          <FormLabel className="font-normal">Nervous</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="chaos" />
                          </FormControl>
                          <FormLabel className="font-normal">Chaos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="biasa" />
                          </FormControl>
                          <FormLabel className="font-normal">B aja</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="semangat" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Semangat dongg. Gak sabarrr
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Opini Day (input) */}
          <FormField
            control={form.control}
            name="opiniDay"
            render={({ field }) => (
              <FormItem>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Berdasarkan materi Pra-Day, menurut kalian Day 0 ini bakal
                      kayak gimana sih?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          {/* Saran Day (input) */}
          <FormField
            control={form.control}
            name="saranDay"
            render={({ field }) => (
              <FormItem>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <FormLabel>
                      Apakah ada saran untuk keberlangsungan Day 0 ini?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
}
