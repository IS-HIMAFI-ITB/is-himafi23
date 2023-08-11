"use client";

import { useParams } from "next/navigation";
import React, { useContext } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TugasDetailsContext } from "@/context/tugas-details-provider";
import { formatDate, formatTime } from "@/lib/utils";
import { TugasQuery } from "@/types/query-type";
import { useQuery } from "@tanstack/react-query";

export default function TugasComment() {
  const params = useParams();
  const initialData = useContext(TugasDetailsContext);
  const { data: tugasDetails, isLoading } = useQuery<TugasQuery, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
    initialData: initialData,
  });

  if (!tugasDetails) return null;

  const comments = tugasDetails.comments;

  if (isLoading)
    return (
      <p className="max-h-[200px] overflow-y-auto text-base">Loading...</p>
    );

  if (!comments || comments.length === 0)
    return (
      <div className="max-h-[200px] overflow-y-auto flex flex-col gap-3 text-base my-4">
        No comments yet.
      </div>
    );

  return (
    <div
      id="text-area-style"
      className="max-h-[200px] overflow-y-auto flex flex-col gap-6 text-base my-3 py-3"
    >
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-row gap-4 items-start w-full"
        >
          <div>
            <Avatar>
              <AvatarImage src={"@/../public/images/profile.png"} />
              <AvatarFallback>
                {comment.author?.name?.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1 not-prose">
            <p className="text-xs font-light opacity-70">
              {formatDate(comment.createdAt)}, {formatTime(comment.createdAt)}
            </p>
            <div className="flex flex-row flex-wrap w-full items-center justify-between gap-2 text-sm">
              <p className="font-bold">{comment.author?.name}</p>
              <Badge>{comment.author?.nim}</Badge>
            </div>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
