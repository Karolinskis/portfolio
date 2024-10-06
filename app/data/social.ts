import {
  BiLogoDiscord,
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoSteam,
} from "react-icons/bi";
import { MdEmail } from "react-icons/md";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "/github",
    icon: BiLogoGithub,
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "/linkedin",
    icon: BiLogoLinkedin,
  },
  {
    id: 3,
    name: "Discord",
    url: "/discord",
    icon: BiLogoDiscord,
  },
  {
    id: 4,
    name: "Steam",
    url: "/steam",
    icon: BiLogoSteam,
  },
  {
    id: 5,
    name: "Email",
    url: "mailto:karolis.paulavicius2002@gmail.com",
    icon: MdEmail,
  },
];
