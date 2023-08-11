import { Post, Submission, Tugas, User } from "@prisma/client";

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

export type SubmissionDetailQuery = Submission & {
  user: User | null;
  tugas: {
    dueDate: Date;
  } | null;
  feedback: (Post & {
    author: { name: string; nim: string | null } | null;
  })[];
};
