"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";
import DiscordGameIcon from "@/public/discord-game-icon.svg";
import { fetchDiscordProfile } from "@/utils/discord";
import { DiscordProfileData } from "@/@types/discord";

const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${hrs > 0 ? String(hrs).padStart(2, "0") + ":" : ""}${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

function DiscordProfileCard({ userID }: { userID: string | undefined }) {
  const [profile, setProfile] = useState<DiscordProfileData | null>(null);
  console.log(profile);
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (userID) {
      fetchDiscordProfile(userID).then((data) => setProfile(data));
    }
  }, [userID]);

  useEffect(() => {
    if (
      profile &&
      profile.activities &&
      profile.activities[0] &&
      profile.activities[0].timestamps &&
      profile.activities[0].timestamps.start
    ) {
      const startTimestamp = profile.activities[0].timestamps.start;
      const updateElapsedTime = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        setElapsedTime(formatTime(elapsed));
      };
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [profile]);

  if (!profile || !profile.discord_user) return null;

  return (
    <div className="dark:bg-gradient-to-r dark:from-neutral-800 dark:to-zinc-800 bg-gradient-to-r from-neutral-200 to-zinc-200 rounded-lg shadow-xl p-4 flex justify-between gap-2">
      <div>
        <div className="flex items-center mb-2 ml-2">
          <div className="relative">
            <Tooltip text={profile.discord_status}>
              <img
                src={`https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}.gif`}
                alt={profile.discord_user.username}
                className="w-12 h-12 rounded-full mr-4"
              />
              {profile.discord_status === "offline" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-gray-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
              {profile.discord_status === "online" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
              {profile.discord_status === "idle" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-yellow-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
              {profile.discord_status === "dnd" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </Tooltip>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {profile.discord_user.display_name}
            </h2>
          </div>
        </div>
        {/* Activity */}
        {profile.activities &&
        profile.activities[0] &&
        profile.activities[0].type == 0 ? (
          <div className="rounded-lg flex flex-col space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden">
            <div className="flex space-x-4 items-center">
              {profile.activities[0].assets ? (
                <div className="flex-shrink-0 relative">
                  <img
                    src={`https://cdn.discordapp.com/app-assets/${profile.activities[0].application_id}/${profile.activities[0].assets.large_image}.png`}
                    alt={profile.activities[0].assets.large_text}
                    className="w-28 h-28 rounded-lg"
                    draggable="false"
                  />
                  <img
                    src={`https://cdn.discordapp.com/app-assets/${profile.activities[0].application_id}/${profile.activities[0].assets.small_image}.png`}
                    alt={profile.activities[0].assets.small_text}
                    className="rounded-full bg-gray-100 bg-opacity-20 h-6 right-0 bottom-0 ring-4 ring-gray-100 ring-opacity-20 w-6 absolute"
                  />
                </div>
              ) : (
                <Image
                  src={DiscordGameIcon}
                  width={112}
                  height={112}
                  alt={profile.activities[0].name}
                />
              )}

              <div className="space-y-px w-80">
                <h1 className="font-semibold text-lg leading-tight truncate">
                  {profile.activities[0].name}
                </h1>
                <h2 className="leading-tight opacity-90 line-clamp-1">
                  {profile.activities[0].details}
                </h2>
                <h3 className="leading-tight opacity-90 line-clamp-1">
                  {profile.activities[0].state}
                </h3>
                <h3 className="leading-tight opacity-90 line-clamp-1">
                  {elapsedTime} elapsed
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg flex flex-col space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden">
            <div className="flex space-x-4 items-center animate-pulse">
              <div className="flex-shrink-0 relative w-28 h-28 bg-gray-300 rounded-lg"></div>
              <div className="space-y-px w-80">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscordProfileCard;
