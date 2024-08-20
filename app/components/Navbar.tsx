import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Navbar() {
  return (
    <div className="z-[999] fixed max-w-6xl md:w-2/4 xs:flex flex-row justify-between items-center px-4 py-2 mt-4 md:mt-6 rounded-md bg-white/60 dark:bg-[#12181d]/60 border border-slate-800/50 backdrop-blur-lg">
      <div className="flex flex-row items-center gap-2 w-full">
        {/* FIXME */}
        <ThemeToggle />
        <Link href="/">
          <Button variant={"outline"}>Home</Button>
        </Link>
        <Link href={"/contact"}>
          <Button variant={"outline"}>Contact</Button>
        </Link>
        <a href="https://github.com/Karolinskis" className="ml-auto">
          <Button variant={"outline"} size={"icon"}>
            <Github />
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/karolis-paulavicius/">
          <Button variant={"outline"} size={"icon"}>
            <Linkedin />
          </Button>
        </a>
        <a target="_blank" href="mailto:karolis.paulavicius2002@gmail.com">
          <Button variant={"outline"} size={"icon"}>
            <Mail />
          </Button>
        </a>
      </div>
    </div>
  );
}
