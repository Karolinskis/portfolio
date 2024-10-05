"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/app/components/ui/tooltip";

export default function HeroContainer() {
  function calculateAge(birthDate: string) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  return (
    <section id="hero" className="sm:flex gap-8 space-y-4 sm:space-y-0 z-10">
      <div className="max-w-3xl space-y-4 font-semibold not-italic leading-9 tracking-tighter flex-grow">
        <h1 className="text-5xl text-black dark:text-white">Hi, I'm Karolis</h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-400">
          I'm a <Age />
          -year-old Software Engineer mainly focused on backend development.
        </h2>
      </div>
      <div className="hidden sm:block">
        <div className="relative inline-flex h-24 w-24 lg:h-32 lg:w-32">
          <Image
            src="/profile.jpg"
            alt="Karolis"
            width={256}
            height={256}
            className="rounded-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Age() {
  const initialAge = 18;
  const birthTimestamp = 1038917532000;

  const [age, setAge] = useState<number>(initialAge);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(dayjs().diff(birthTimestamp, "year", true));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="bg-gray-400 bg-opacity-30 px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-300">
            {age.toFixed(2)}
          </span>
        </TooltipTrigger>
        <TooltipContent className="text-center max-w-[250px]" side="right">
          <span>{age.toFixed(9)}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
