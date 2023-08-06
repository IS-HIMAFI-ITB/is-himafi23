"use client";

import { AnimatePresence as AP } from "framer-motion";
import React from "react";

export default function AnimatePresence({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AP>{children}</AP>;
}
