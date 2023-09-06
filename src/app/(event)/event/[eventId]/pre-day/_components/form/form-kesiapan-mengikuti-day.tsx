"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormPreday } from "../form-provider";

export default function FormKesiapanMengikutiDay({ title }: { title: string }) {
  const { form } = useFormPreday();

  return (
    <>
      {/* Siap Day (linear scale) */}
      <FormField
        control={form.control}
        name="siapDay"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-5 flex flex-col gap-4">
                <FormLabel>
                  {`Apakah kalian sudah siap untuk mengikuti ${title}?`}
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
                  Apakah kalian sudah mempersiapkan spek yang dibutuhkan untuk
                  day nanti?
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
                  Apakah kalian sudah melihat bahan Pra-Day yang diberikan oleh
                  panitia?
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
                  {`Apakah kalian sudah siap untuk mengikuti Day ${title}
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
    </>
  );
}
