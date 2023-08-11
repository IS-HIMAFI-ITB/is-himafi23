"use client";

import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import React, { useContext } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SubmissionDetailsContext } from "@/context/submission-details-provider";
import { UserContext } from "@/context/user-provider";
import { formatDate, formatTime } from "@/lib/utils";
import { SubmissionQuery } from "@/types/query-type";
import { useQuery } from "@tanstack/react-query";

export default function FeedbackSection() {
  const params = useParams();
  const session = useSession();
  const user = useContext(UserContext);
  const initialSubmissionData = useContext(SubmissionDetailsContext);
  const { data: tugasSubmission, isLoading } = useQuery<SubmissionQuery, Error>(
    {
      queryKey: ["tugasSubmission", { tugasId: params.id, userId: user.id }],
      queryFn: async () => {
        const res = await fetch(`/api/submissions/${user.id}/${params.id}`);
        return res.json();
      },
      initialData: initialSubmissionData,
    }
  );

  if (isLoading)
    return (
      <p className="max-h-[200px] w-full overflow-y-auto text-base">
        Loading...
      </p>
    );

  if (!tugasSubmission) return notFound();

  const feedbacks = tugasSubmission.feedback;

  if (!feedbacks || feedbacks.length === 0)
    return (
      <div className="max-h-[200px] w-full overflow-y-auto flex flex-col gap-3 text-base my-3">
        <p className="prose prose-sm prose-invert">Belum ada feedback.</p>
      </div>
    );

  return (
    <div
      id="text-area-style"
      className="max-h-[200px] w-full overflow-y-auto flex flex-col gap-6 text-base my-3 py-3"
    >
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="flex flex-row gap-4 items-start w-full"
        >
          <div>
            <Avatar>
              <AvatarImage
                className="bg-cover"
                src={
                  "https://uploadthing.com/f/6d7f1d22-cf67-4159-a73e-48d18741a9c7_profile.png"
                }
              />
              <AvatarFallback>
                {feedback.author?.name?.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1 not-prose">
            <p className="text-xs font-light opacity-70">
              {formatDate(feedback.createdAt)}, {formatTime(feedback.createdAt)}
            </p>
            <div className="flex flex-row flex-wrap w-full items-center justify-between gap-2 text-sm">
              <p className="font-bold">{feedback.author?.name}</p>
              <Badge>{feedback.author?.nim}</Badge>
            </div>
            <p>{feedback.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
