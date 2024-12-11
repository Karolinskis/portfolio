import {
  BiLogoDiscord,
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoSteam,
  BiLogoTwitter,
} from "react-icons/bi";
import { FaBluesky } from "react-icons/fa6";
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
    name: "Twitter",
    url: "/twitter",
    icon: BiLogoTwitter,
  },
  {
    id: 5,
    name: "Bluesky",
    url: "/bluesky",
    icon: FaBluesky,
  },
  {
    id: 6,
    name: "Email",
    url: "mailto:karolis.paulavicius2002@gmail.com",
    icon: MdEmail,
  },
];
