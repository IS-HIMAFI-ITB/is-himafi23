"use client";

import { AnimatePresence as AP, AnimatePresenceProps } from "framer-motion";
import React from "react";

interface Props extends AnimatePresenceProps {
  children: React.ReactNode;
}

export default function AnimatePresence(props: Props) {
  return <AP {...props}>{props.children}</AP>;
}
