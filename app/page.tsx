import Image from "next/image";
import Card from "./components/Card";

import HeroContainer from "./components/sections/hero";
import DiscordProfileCard from "./components/DiscordProfileCard";

let projects = [
  {
    imageLink: "/IT-sponsor.png",
    title: "IT sponsor",
    description:
      "IT Sponsor is a web application that allows users to create and manage IT projects. Users can create projects, assign tasks to team members, and track progress. The application also includes a chat feature for team communication.",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    link: "https://github.com/IT-sponsor/IT-sponsor",
  },
  {
    imageLink: "/COTR-image.png",
    title: "Champions of the realm",
    description:
      "In this epic adventure, players are transported to a mystical land filled with magic, dragons, and treacherous enemies. As one of three classes - mage, warrior, or archer - you'll need to battle your way through hordes of foes, dodging deadly projectiles and summoning powerful spells to turn the tide of battle.",
    technologies: ["Godot", "CSharp"],
    link: "https://github.com/Karolinskis/Champions-of-the-Realm",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col h-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-10 pb-8 justify-center">
      <HeroContainer />
      {/* <DiscordProfileCard userID={process.env.NEXT_PUBLIC_DISCORD_USER_ID} /> */}
    </main>
  );
}
