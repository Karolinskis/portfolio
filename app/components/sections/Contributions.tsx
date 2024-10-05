"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { getYearArray } from "@/app/lib/utils";
import GitHubCalendar from "react-github-calendar";
import { Button } from "../ui/button";

export default function Contributions() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<
    "light" | "dark" | undefined
  >(undefined);
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  useEffect(() => {
    setCurrentTheme(scheme);
  }, [scheme]);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const githubCreatedAt = Number(process.env.NEXT_PUBLIC_GITHUB_CREATED_AT);
  const years = getYearArray(githubCreatedAt);

  if (!username || !githubCreatedAt) {
    return (
      <section>
        <h2 className="text-3xl text-black dark:text-white font-semibold">
          Contributions
        </h2>
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
            <GitHubCalendar
              username="unknown"
              loading={true}
              year={calendarYear}
              colorScheme={currentTheme}
              blockSize={12}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-3xl text-black dark:text-white font-semibold">
        Contributions
      </h2>

      <div className="flex flex-col gap-4">
        <div className="border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-full max-h-fit">
          <GitHubCalendar
            username={username}
            year={calendarYear}
            colorScheme={currentTheme}
            blockSize={14}
          />
        </div>
        <div className="flex justify-end flex-row gap-3 overflow-x-auto max-w-full">
          {years.map((year) => (
            <Button
              key={year}
              onClick={() => setCalendarYear(year)}
              variant={"outline"}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
