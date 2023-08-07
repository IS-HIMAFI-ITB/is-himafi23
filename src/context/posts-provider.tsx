"use client";

import React, { createContext } from "react";

import { Post } from "@prisma/client";

export const PostsContext = createContext([{}] as Post[]);

export default function PostsProvider({
  posts,
  children,
}: {
  posts: Post[];
  children: React.ReactNode;
}) {
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
}
