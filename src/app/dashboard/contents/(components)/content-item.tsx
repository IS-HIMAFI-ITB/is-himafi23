"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast/useToast";
import { getContentById, updateContentById } from "@/lib/client-fetch";
import { getQueryClient } from "@/lib/utils";
import { Contents } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function ContentItem({ content }: { content: Contents }) {
  const { data, isLoading, isError } = useQuery<Contents, Error>({
    queryKey: ["content", content.id],
    queryFn: () => getContentById(content.id),
    initialData: content,
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });

  const mutation = useMutation({
    mutationKey: ["content", content.id],
    mutationFn: () => updateContentById(content.id, contentValue),
    onMutate: () => {
      toast({
        title: "Updating",
        description: (
          <p>
            Updating <span className="font-bold">{content.name}</span>&apos;
            content...
          </p>
        ),
      });
    },
    onSuccess: async (data) => {
      const res: Contents = await data.json();
      setEdit(false);
      setUpdatedContent(res.content);
      queryClient.setQueryData(["content", content.id], res);
      queryClient.invalidateQueries(["contents"]);
      toast({
        title: "Success",
        description: (
          <p>
            Content <span className="font-bold">{res.name}</span> successfully
            updated.
          </p>
        ),
      });
    },
    onError: (err: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    },
  });

  const queryClient = getQueryClient();
  const [updatedContent, setUpdatedContent] = React.useState(data.content);
  const [contentValue, setContentValue] = React.useState(updatedContent);
  const [edit, setEdit] = React.useState(false);

  const handleCancel = () => {
    setContentValue(data.content);
    setEdit(false);
  };

  return (
    <Card className="hover:bg-foreground/5">
      <CardHeader>
        <CardTitle>{content.name}</CardTitle>
        {!edit && (
          <CardDescription className="max-w-2xl">
            {updatedContent}
          </CardDescription>
        )}
        {edit && (
          <>
            <CardDescription className="max-w-2xl">
              <Textarea
                defaultValue={updatedContent}
                onChange={(e) => setContentValue(e.target.value)}
              />
            </CardDescription>
          </>
        )}
      </CardHeader>

      {edit && (
        <>
          <CardFooter className="space-x-3">
            <Button
              variant={"outline"}
              className="w-max"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button className="w-max" onClick={() => mutation.mutate()}>
              Save
            </Button>
          </CardFooter>
        </>
      )}

      {!edit && (
        <>
          <CardFooter>
            <Button
              variant={"outline"}
              className="w-max"
              onClick={() => setEdit(true)}
            >
              Edit content
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
