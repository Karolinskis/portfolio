import { Metadata } from "next";
import DiscordProfileCard from "../components/DiscordProfileCard";
import React, { useState } from "react";
import Message from "../components/Message";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-4xl space-y-4 font-semibold not-italic leading-9 tracking-tighter flex-grow px-4">
        <h1 className="text-5xl text-black dark:text-white">Let's talk!</h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-400">
          Have any questions or want to chat? Feel free to leave a message below
          or contact me on Discord.
        </h2>
      </div>

      <div className="w-full max-w-4xl flex md:flex-row flex-col md:justify-between justify-center items-start space-y-4 md:space-y-0 mt-4 px-4 md:space-x-4">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Message />
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <DiscordProfileCard
            userID={process.env.NEXT_PUBLIC_DISCORD_USER_ID}
          />
        </div>
      </div>
    </div>
  );
}
