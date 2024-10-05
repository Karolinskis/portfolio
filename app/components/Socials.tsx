import { socialLinks } from "@/app/data/social";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function Socials() {
  return (
    <ul className="flex items-center flex-wrap gap-x-2 gap-y-4 my-10">
      {socialLinks.map((value) => (
        <li key={value.id}>
          <a href={value.url} target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="flex items-center gap-2">
              <value.icon className="w-6 h-6" />
              <span>{value.name}</span>
            </Button>
          </a>
        </li>
      ))}
    </ul>
  );
}
