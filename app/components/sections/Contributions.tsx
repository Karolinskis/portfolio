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
  const years = getYearArray(githubCreatedAt, -5);

  if (!username || !githubCreatedAt) {
    return (
      <section>
        <h2 className="text-3xl text-black dark:text-white font-semibold">
          Contributions
        </h2>
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="border dark:border-gray-700 border-gray-200 shadow p-8 rounded-lg max-w-fit max-h-fit">
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

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="border dark:border-gray-700 border-gray-200 shadow p-8 rounded-lg w-full lg:max-w-[calc(100%-6rem)]">
          <GitHubCalendar
            username={username}
            year={calendarYear}
            colorScheme={currentTheme}
            blockSize={14}
          />
        </div>
        <div className="flex-shrink-0 flex flex-row lg:flex-col gap-3 w-20">
          {years.map((year) => (
            <Button
              key={year}
              onClick={() => setCalendarYear(year)}
              variant={"outline"}
              className="hover:bg-gray-400 transition-colors duration-300"
              title={`View contributions for year ${year}`}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
