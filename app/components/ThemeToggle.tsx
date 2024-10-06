"use client";

import { useState, useEffect } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/button";
import { reportValue } from "@vercel/flags";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = (newTheme: string) => {
    if (newTheme === "light") {
      setTheme("light");
      reportValue("theme", "light");
    }
    if (newTheme === "dark") {
      setTheme("dark");
      reportValue("theme", "dark");
    }
  };

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      reportValue("theme", resolvedTheme);
    }
  }, [resolvedTheme]);

  if (!mounted)
    return (
      <Button variant="outline" size="icon">
        <MdOutlineWbSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <HiOutlineMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );

  if (resolvedTheme === "dark") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeToggle("light")}
      >
        <MdOutlineWbSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <HiOutlineMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeToggle("dark")}
      >
        <MdOutlineWbSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <HiOutlineMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
}
