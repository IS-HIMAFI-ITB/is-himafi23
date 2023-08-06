"use client";

import "./editor-style.css";

import { ChevronDown, PlusIcon, X } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { H2 } from "@/components/typography";
import { Alert } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event, Izin, StatusIzin, User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { DataTable } from "../data-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../local-accordion";
import CreateEventForm from "./create-event-form";
import EditEventForm from "./edit-event-form";
import { izinColumns } from "./izin-column";

function CreateTitleForm({
  form,
  onTitleSubmit,
  titleForm,
}: {
  titleForm: UseFormReturn<z.infer<typeof titleSchema>>;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onTitleSubmit: (data: z.infer<typeof titleSchema>) => void;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onTitleSubmit)} className="space-y-4">
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
                form.reset({ title: "Ini judul" }, { keepDirtyValues: false });
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
  );
}

const formSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(500),
  date: z.date(),
  time: z.string(),
  presensiQuestionAnswer: z.string().nonempty(),
  enablePresensi: z.boolean(),
  checkRecheckForm: z.union([z.string().url(), z.undefined(), z.literal("")]),
  disabled: z.boolean(),
});

const titleSchema = z.object({
  title: z.string().max(50),
});

interface IzinQuery extends Izin {
  user: User;
}

interface EventQuery extends Event {
  hadir: User[];
  izin: IzinQuery[];
}

export default function KehadiranSectionPanitia() {
  const event = useQuery<EventQuery[], Error>({
    queryKey: ["events"],
    queryFn: () => fetch(`/api/event/all`).then((res) => res.json()),
  });
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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
      description:
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero adipisci atque, vero saepe provident eveniet odit fuga pariatur praesentium error? Voluptatibus nisi alias aut, eos suscipit libero dolorum debitis facilis!</p>",
      enablePresensi: false,
      date: new Date(),
      presensiQuestionAnswer: undefined,
      checkRecheckForm: undefined,
      disabled: false,
      time: moment(new Date()).format("HH:mm"),
    },
  });
  const descriptionEditorRef = useRef<any>(null);

  const createEvent = useMutation({
    mutationFn: ({
      title,
      description,
      date,
      presensiQuestionAnswer,
      checkRecheckForm,
      disabled,
      enablePresensi,
    }: {
      title: string;
      description: string;
      date: Date;
      presensiQuestionAnswer: string;
      checkRecheckForm: string | undefined;
      disabled: boolean;
      enablePresensi: boolean;
    }) => {
      return fetch("/api/event/", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          date,
          presensiQuestionAnswer,
          checkRecheckForm,
          disabled,
          enablePresensi,
        }),
      });
    },
    onMutate: (data) => {
      setLoading(true);
      toast({
        title: "Submitting event...",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Event submitted!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting event!",
        description: error.message,
      });
    },
    onSettled: () => {
      setLoading(false);
      setCreate(false);
    },
  });

  function onTitleSubmit(data: z.infer<typeof titleSchema>) {
    form.setValue("title", data.title);
    setCreate(true);
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedDate = new Date(
      data.date.setTime(
        new Date(data.date).setHours(
          Number(data.time.split(":")[0]),
          Number(data.time.split(":")[1])
        )
      )
    );
    const formattedCheckRecheck =
      data.checkRecheckForm === "" ? undefined : data.checkRecheckForm;
    createEvent.mutate({
      title: data.title,
      description: data.description,
      date: formattedDate,
      presensiQuestionAnswer: data.presensiQuestionAnswer,
      checkRecheckForm: formattedCheckRecheck,
      disabled: data.disabled,
      enablePresensi: data.enablePresensi,
    });
  }

  const mutateIzin = useMutation({
    mutationFn: ({ id, status }: { id: string; status: StatusIzin }) => {
      return fetch(`/api/izin/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
        }),
      });
    },
  });

  if (event.isError) return <div>{event.error.message}</div>;
  if (event.isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-6 justify-between items-center w-full mt-6">
        <H2 className="border-none p-0 xs:text-3xl text-xl">Acara Peserta</H2>

        <div className="flex flex-row gap-6 items-center">
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
                <CreateTitleForm {...{ form, onTitleSubmit, titleForm }} />
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <Separator className="md:block hidden" />

      <Accordion
        defaultValue={"0"}
        value={create ? "0" : undefined}
        type="single"
        collapsible
        className="space-y-4"
      >
        {create && (
          <CreateEventForm titleForm={titleForm} setCreate={setCreate} />
        )}

        {event.data &&
          event.data.map((eventItem, i) => (
            <AccordionItem
              key={eventItem.id}
              className="border-none"
              value={create ? i.toString() + 1 : i.toString()}
            >
              <AccordionTrigger
                onClick={
                  create
                    ? () =>
                        toast({
                          title: "Kamu sedang dalam mode membuat event!",
                        })
                    : () => {
                        return;
                      }
                }
                asChild
              >
                <Alert className="flex flex-row gap-12 items-center px-12 py-4 bg-card/30 border-primary/10 backdrop-blur h-full w-full hover:cursor-pointer hover:no-underline transition-all">
                  <div className="prose prose-invert prose-sm md:prose-base">
                    <h3>{eventItem.title}</h3>
                  </div>

                  <div className="not-prose">
                    <ChevronDown className="mr-2 transition-all" size={24} />
                  </div>
                </Alert>
              </AccordionTrigger>

              {!edit && (
                <AccordionContent
                  className="bg-card/30 backdrop-blur mt-4 w-full max-w-full rounded-md p-12 prose prose-invert prose-sm md:prose-base"
                  asChild
                >
                  <Button
                    className="w-full mt-6"
                    size={"lg"}
                    onClick={() => setEdit(true)}
                    variant="outline"
                  >
                    Edit detail acara
                  </Button>
                  {eventItem.description && (
                    <div
                      className="pt-4"
                      dangerouslySetInnerHTML={{
                        __html: eventItem.description,
                      }}
                    />
                  )}

                  {eventItem.presensiQuestion && (
                    <>
                      <h3>Pertanyaan Presensi</h3>

                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: eventItem.presensiQuestion,
                        }}
                      />
                    </>
                  )}

                  {!create && (
                    <Tabs defaultValue="izin" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="izin">
                          Izin
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="hadir">
                          Hadir
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="izin">
                        <DataTable
                          lastFetchTime={event.dataUpdatedAt}
                          fetching={event.isFetching}
                          data={eventItem.izin}
                          columns={izinColumns}
                        />
                      </TabsContent>
                    </Tabs>
                  )}
                </AccordionContent>
              )}

              {edit && <EditEventForm event={eventItem} setEdit={setEdit} />}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
