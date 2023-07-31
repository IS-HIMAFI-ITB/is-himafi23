import { CalendarIcon, Loader2Icon } from "lucide-react";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast/useToast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";

import { AccordionContent } from "./local-accordion";

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

export default function EditEventForm({
  event,
  setEdit,
}: {
  event: Event;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      description: event.description ?? "<p>Deskripsi acara belum diisi.</p>",
      enablePresensi: event.enablePresensi,
      date: new Date(event.date),
      presensiQuestionAnswer: event.presensiQuestionAnswer ?? undefined,
      checkRecheckForm:
        event.checkRecheckForm === "NONE"
          ? ""
          : event.checkRecheckForm ?? undefined,
      disabled: event.disabled,
      time: moment(event.date).format("HH:mm"),
    },
  });
  const descriptionEditorRef = useRef<any>(null);
  const editEvent = useMutation({
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
      return fetch(`/api/event/${event.id}`, {
        method: "PATCH",
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
        title: "Editing event...",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["events"]);
      toast({
        title: "Event edited!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error editing event!",
        description: error.message,
      });
    },
    onSettled: () => {
      setLoading(false);
      setEdit(false);
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
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
    editEvent.mutate({
      title: data.title,
      description: data.description,
      date: formattedDate,
      presensiQuestionAnswer: data.presensiQuestionAnswer,
      checkRecheckForm:
        formattedCheckRecheck === "" ? "NONE" : formattedCheckRecheck,
      disabled: data.disabled,
      enablePresensi: data.enablePresensi,
    });
  }
  return (
    <AccordionContent
      className="grid grid-cols-1 bg-card/30 backdrop-blur max-w-full w-full mt-4 rounded-md p-12 prose prose-invert prose-sm md:prose-base"
      asChild
    >
      <Editor
        id="description"
        onChange={(e) => {
          form.setValue(
            "description",
            e.target.getContent() ??
              "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero adipisci atque, vero saepe provident eveniet odit fuga pariatur praesentium error? Voluptatibus nisi alias aut, eos suscipit libero dolorum debitis facilis!</p>"
          );
        }}
        onInit={(evt, editor) => (descriptionEditorRef.current = editor)}
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
          toolbar_sticky_offset: 100,
        }}
      />
      {/* <div className="pt-4"></div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-y-2 gap-x-6 lg:flex-row w-full justify-between items-start">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
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
              name="time"
              render={({ field }) => (
                <FormItem className="w-full mt-[0.4em]">
                  <FormLabel>
                    <h3>Waktu Acara</h3>
                  </FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormDescription>
                    {field.value &&
                      `Waktu yang kamu pilih adalah ${moment(
                        new Date().setHours(
                          Number(field.value.split(":")[0]),
                          Number(field.value.split(":")[1])
                        )
                      ).format("HH:mm")} waktu setempat.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2 gap-x-6 lg:flex-row w-full justify-between items-start">
            <FormField
              control={form.control}
              name="presensiQuestionAnswer"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <h3>Jawaban Kuis Presensi</h3>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Perlu diperhatikan bahwa bagian ini bersifat{" "}
                    <em>case-insensitive</em>, contoh: &quot;AbCD&quot; dan
                    &quot;abcd&quot; akan dianggap sama.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkRecheckForm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <h3>Link Check-Recheck</h3>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan link form check-recheck untuk acara ini. Kosongkan
                    jika tidak ada.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2 gap-x-6 lg:flex-row w-full justify-between items-start">
            <FormField
              control={form.control}
              name="disabled"
              render={({ field }) => (
                <div className="space-y-2 h-full w-full mt-[1.6em]">
                  <FormItem className="flex flex-row items-center gap-8 w-full justify-between rounded-lg h-fit border p-4">
                    <div className="space-y-0.5 ">
                      <FormLabel className="text-base">
                        Tampilkan ke peserta
                      </FormLabel>
                      <FormDescription>
                        Jika ini dinonaktifkan, detail acara yang kalian buat
                        tidak akan dapat dilihat peserta sampai diaktifkan
                        kembali.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="h-full"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="enablePresensi"
              render={({ field }) => (
                <div className="space-y-2 h-full w-full mt-[1.6em]">
                  <FormItem className="flex flex-row items-center gap-8 w-full justify-between rounded-lg h-fit border p-4">
                    <div className="space-y-0.5 ">
                      <FormLabel className="text-base">Buka Presensi</FormLabel>
                      <FormDescription>
                        Peserta akan langsung dapat mengisi presensi apabila
                        presensi dibuka.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="h-full"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="flex flex-row gap-6 w-full pt-4">
        <Button
          className="w-full"
          size={"lg"}
          onClick={() => setEdit(false)}
          variant="outline"
        >
          Batal
        </Button>
        <Button
          className="w-full"
          size={"lg"}
          onClick={() => onSubmit(form.getValues())}
          disabled={loading}
          variant="default"
        >
          {loading ? <Loader2Icon className="animate-spin inline" /> : "Submit"}
        </Button>
      </div>
    </AccordionContent>
  );
}
