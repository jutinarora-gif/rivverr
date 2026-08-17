"use client";

import { useEffect, useState } from "react";

/**
 * True on phones/tablets and touch-first devices, where full-screen WebGL and
 * JS-driven smooth scroll cost battery and jank without adding anything —
 * there is no cursor to drive them.
 */
export function isLiteMotionDevice() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(max-width: 767px)").matches
  );
}

export function useLiteMotion() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    setLite(isLiteMotionDevice());
  }, []);
  return lite;
}
