"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Arcade() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/arcade/snake");
  });
}
