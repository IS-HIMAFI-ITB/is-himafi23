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

export default function FormIdentitas() {
  const { form } = useFormPreday();

  return (
    <>
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
    </>
  );
}
