"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormPreday } from "../form-provider";

export default function FormKondisiTubuh({ title }: { title: string }) {
  const { form } = useFormPreday();

  return (
    <>
      {/* Kondisi Tubuh (select w/other) */}
      <FormField
        control={form.control}
        name="kondisiTubuh"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-5 flex flex-col gap-4">
                <FormLabel>Bagaimana kondisi tubuh kalian saat ini?</FormLabel>
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
                      <FormLabel className="font-normal">Kurang fit</FormLabel>
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
                  Apakah ada penyakit tertentu yang menyulitkan kalian mengikuti
                  rangkaian acara day?
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
                  Jika ada, bolehkah kami tahu lebih spesifik tentang kondisi
                  kalian? tolong jelaskan dengan rinci
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
    </>
  );
}
