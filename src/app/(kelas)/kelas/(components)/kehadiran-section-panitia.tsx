"use client";

import "./editor-style.css";

import { CalendarIcon, ChevronDown, PlusIcon, X } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { H2 } from "@/components/typography";
import { Alert } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./local-accordion";

const formSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(500),
  date: z.date(),
  presensiQuestion: z.string().max(225),
  presensiQuestionAnswer: z.string(),
  enablePresensi: z.boolean(),
});

const titleSchema = z.object({
  title: z.string().max(50),
});

export default function KehadiranSectionPanitia() {
  const event = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: () => fetch(`/api/event/all`).then((res) => res.json()),
  });
  const [create, setCreate] = useState(false);
  const titleForm = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: "Ini judul",
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: titleForm.getValues("title"),
      description: "<p>Ini deskripsi.</p>",
      enablePresensi: false,
      date: new Date(),
    },
  });
  const descriptionEditorRef = useRef<any>(null);
  const presensiQuestionEditorRef = useRef<any>(null);

  function onTitleSubmit(data: z.infer<typeof titleSchema>) {
    form.setValue("title", data.title);
    setCreate(true);
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  if (event.isError) return <div>{event.error.message}</div>;
  if (event.isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-6 justify-between items-center w-full mt-6">
        <H2 className="border-none p-0 xs:text-3xl text-xl">Acara Peserta</H2>

        <div className="flex flex-row gap-2 items-center">
          {!create && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-max md:w-full md:max-w-max"
                  variant={"outline"}
                >
                  <PlusIcon className="md:mr-2" />
                  <span className="inline whitespace-nowrap">Tambah Acara</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onTitleSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={titleForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Judul Acara</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Masukkan judul acara yang akan ditampilkan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild className="w-full">
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            form.reset(
                              { title: "Ini judul" },
                              { keepDirtyValues: false }
                            );
                          }}
                        >
                          <X className="shrink-0 mr-2" size={24} /> Batal
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild className="w-full">
                        <Button
                          onClick={() =>
                            onTitleSubmit({
                              title: titleForm.getValues("title"),
                            })
                          }
                        >
                          Konfirm
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {create && (
            <div className="flex flex-row gap-2 items-center">
              <Button
                onClick={() => {
                  setCreate(false);
                }}
                className="w-max md:w-full md:max-w-max"
                variant={"outline"}
              >
                <X className="md:mr-2" />
                <span className="hidden md:inline whitespace-nowrap">
                  Batal
                </span>
              </Button>
              <Button
                className="w-max md:w-full md:max-w-max"
                variant={"default"}
              >
                <PlusIcon className="md:mr-2" />
                <span className="hidden md:inline whitespace-nowrap">
                  Tambah
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Separator className="md:block hidden" />
      <Accordion
        defaultValue={"0"}
        type="single"
        collapsible
        className="space-y-4"
      >
        {create && (
          <AccordionItem key={"0edit"} className="border-none" value={"0"}>
            <AccordionTrigger asChild>
              <Alert className="flex flex-row gap-12 items-center px-12 py-4 bg-card/30 border-primary/10 backdrop-blur h-full w-full hover:cursor-pointer hover:no-underline transition-all">
                <div className="prose prose-invert prose-sm md:prose-base">
                  <h3>{form.getValues("title")}</h3>
                </div>
                <div className="not-prose">
                  <ChevronDown className="mr-2 transition-all" size={24} />
                </div>
              </Alert>
            </AccordionTrigger>
            <AccordionContent
              className="bg-card/30 backdrop-blur max-w-full w-full mt-4 rounded-md p-12 prose prose-invert prose-sm md:prose-base"
              asChild
            >
              <Editor
                id="description"
                onChange={(e) => {
                  form.setValue(
                    "description",
                    e.target.getContent() ?? "<p>Ini deskripsi.</p>"
                  );
                }}
                onInit={(evt, editor) =>
                  (descriptionEditorRef.current = editor)
                }
                apiKey={process.env.TINYMCE_API_KEY}
                initialValue={form.getValues("description")}
                init={{
                  inline: true,
                  skin: "small",
                  icons: "jam",
                  menubar: false,
                  toolbar: [
                    "h3 h4 | alignleft aligncenter alignright | emoticons bold italic subscript superscript underline | indent outdent | bullist numlist | link",
                  ],
                  toolbar_location: "bottom",
                  toolbar_mode: "sliding",
                  plugins: ["lists", "link", "emoticons"],
                  content_style: "body { font-family:Inter,Arial,sans-serif; }",
                }}
              />
              {/* <div className="pt-4"></div> */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-24"
                >
                  <FormField
                    control={form.control}
                    name="presensiQuestion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <h3>Pertanyaan Presensi</h3>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Masukkan pertanyaan presensi yang akan ditampilkan
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="grid-flow-row-dense">
                        <FormLabel>
                          <h3>Tanggal Acara</h3>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  moment(new Date(field.value)).format(
                                    "dddd, DD MMMM YYYY"
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (!date) return;
                                field.onChange(date);
                              }}
                              disabled={(date) => {
                                const yesterday = new Date(
                                  new Date(new Date().getTime()).setDate(
                                    new Date().getDate() - 1
                                  )
                                );

                                return date < yesterday;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="presensiQuestionAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <h3>Jawaban Pertanyaan</h3>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Jawaban dari pertanyaan presensi.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enablePresensi"
                    render={({ field }) => (
                      <div className="space-y-2 w-full mt-[1.6em]">
                        <FormItem className="flex flex-row items-center gap-8 w-full justify-between rounded-lg h-fit border p-4">
                          <div className="space-y-0.5 ">
                            <FormLabel className="text-base">
                              Buka Presensi
                            </FormLabel>
                            <FormDescription>
                              Peserta akan langsung dapat mengisi presensi
                              apabila presensi dibuka.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-readonly
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                    )}
                  />
                </form>
              </Form>
            </AccordionContent>
          </AccordionItem>
        )}
        {event.data &&
          event.data.map((event, i) => (
            <AccordionItem
              key={event.id}
              className="border-none"
              value={create ? i.toString() + 1 : i.toString()}
            >
              <AccordionTrigger asChild>
                <Alert className="flex flex-row gap-12 items-center px-12 py-4 bg-card/30 border-primary/10 backdrop-blur h-full w-full hover:cursor-pointer hover:no-underline transition-all">
                  <div className="prose prose-invert prose-sm md:prose-base">
                    <h3>{event.title}</h3>
                  </div>
                  <div className="not-prose">
                    <ChevronDown className="mr-2 transition-all" size={24} />
                  </div>
                </Alert>
              </AccordionTrigger>
              <AccordionContent
                className="bg-card/30 backdrop-blur max-w-full w-full mt-4 rounded-md p-12 prose prose-invert prose-sm md:prose-base"
                asChild
              >
                {event.description && (
                  <div
                    className="pt-4"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}

                {event.presensiQuestion && (
                  <>
                    <h3>Pertanyaan Presensi</h3>

                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: event.presensiQuestion,
                      }}
                    />
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
