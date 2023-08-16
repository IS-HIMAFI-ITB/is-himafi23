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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormPreday } from "../form-provider";

export default function FormEkspektasiDay({ title }: { title: string }) {
  const { form } = useFormPreday();

  return (
    <>
      {/* Ekspektasi Day (select) */}
      <FormField
        control={form.control}
        name="ekspektasiDay"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-5 flex flex-col gap-4">
                <FormLabel>
                  {`Bagaimana perasaan kalian menjelang Day ${title} ini?`}
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
                  Berdasarkan materi Pra-Day, menurut kalian {title} ini bakal
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
                  Apakah ada saran untuk keberlangsungan {title} ini?
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
    </>
  );
}
