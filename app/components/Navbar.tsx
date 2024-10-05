import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { HiHome } from "react-icons/hi2";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="z-[999] fixed max-w-4xl w-full xs:flex flex-row justify-between items-center px-4 py-2 top-3 rounded-md bg-white/60 dark:bg-[#12181d]/60 border border-slate-800/50 backdrop-blur-lg">
      <div className="flex flex-row items-center gap-2 w-full">
        <Link href="/">
          <Button
            variant={"outline"}
            className="hover:bg-gray-400 transition-colors duration-300"
            size={"icon"}
          >
            <HiHome className="text-2xl" />
          </Button>
        </Link>
        <Link href={"/contact"}>
          <Button
            variant={"outline"}
            className="hover:bg-gray-400 transition-colors duration-300"
          >
            Contact
          </Button>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
        {/* <a href="https://github.com/Karolinskis" className="ml-auto">
          <Button
            variant={"outline"}
            size={"icon"}
            className="hover:bg-gray-400 transition-colors duration-300"
          >
            <FiGithub className="text-2xl" />
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/karolis-paulavicius/">
          <Button
            variant={"outline"}
            size={"icon"}
            className="hover:bg-gray-400 transition-colors duration-300"
          >
            <FiLinkedin className="text-2xl" />
          </Button>
        </a>
        <a target="_blank" href="mailto:karolis.paulavicius2002@gmail.com">
          <Button
            variant={"outline"}
            size={"icon"}
            className="hover:bg-gray-400 transition-colors duration-300"
          >
            <FiMail className="text-2xl" />
          </Button>
        </a> */}
      </div>
    </div>
  );
}
