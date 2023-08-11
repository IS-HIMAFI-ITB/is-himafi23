import { Post, Submission, Tugas } from "@prisma/client";

export type SubmissionQuery =
  | (Submission & {
      feedback: (Post & {
        author: { name: string; nim: string | null } | null;
      })[];
    })
  | undefined;
export type TugasQuery = Tugas & {
  comments: (Post & { author: { name: string; nim: string | null } | null })[];
};
