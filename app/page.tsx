import Image from "next/image";
import Card from "./components/Card";

import HeroContainer from "./components/sections/hero";
import DiscordProfileCard from "./components/DiscordProfileCard";
import Socials from "./components/Socials";

export default function Home() {
  return (
    <div className="flex flex-col h-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-8 justify-center">
      <HeroContainer />
      <Socials />
    </div>
  );
}
