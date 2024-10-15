"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/app/components/ui/tooltip";
import DiscordGameIcon from "@/public/discord-game-icon.svg";
import * as DiscordTypes from "@/types/discord";
import * as DiscordUtils from "@/app/lib/discord";
import Link from "next/link";

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
  const [discordUserStatus, setDiscordUserStatus] = useState<string>("");
  const [discordUser, setDiscordUser] =
    useState<DiscordTypes.DiscordUser | null>(null);
  const [discordActivities, setDiscordActivities] = useState<
    DiscordTypes.Activity[]
  >([]);
  const [SpotifyActivity, setSpotifyActivity] =
    useState<DiscordTypes.SpotifyActivity | null>(null);
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (!userID) return;

    const ws = DiscordUtils.initializeWebSocket(userID, (presence) => {
      setDiscordUserStatus(presence.discord_status);
      setDiscordUser(presence.discord_user);
      setDiscordActivities(presence.activities || []);
      setSpotifyActivity(presence.spotify || null);
    });

    return () => {
      ws.close();
    };
  }, [userID]);

  useEffect(() => {
    if (
      discordActivities &&
      discordActivities[0] &&
      discordActivities[0].type === 0 &&
      discordActivities[0].timestamps &&
      discordActivities[0].timestamps.start
    ) {
      const startTimestamp = discordActivities[0].timestamps.start;
      const updateElapsedTime = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        setElapsedTime(formatTime(elapsed));
      };
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [discordActivities]);

  if (!discordUser) return null;

  return (
    <div className="rounded-lg shadow p-4 flex justify-between gap-2 max-w-md border border-gray-200 w-full">
      <div style={{ width: "inherit" }}>
        <Link href={`https://discord.com/users/${discordUser.id}`}>
          <div className="flex items-center mb-2 ml-2">
            <div className="relative">
              <img
                src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.gif`}
                alt={discordUser.username}
                className="w-12 h-12 rounded-full mr-4"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="absolute">
                    {discordUserStatus === "offline" && (
                      <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-transparent border-4 border-white dark:border-gray-500 rounded-full"></span>
                    )}
                    {discordUserStatus === "online" && (
                      <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                    {discordUserStatus === "idle" && (
                      <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-yellow-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                    {discordUserStatus === "dnd" && (
                      <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="right" align="start" alignOffset={400}>
                    <span>{discordUserStatus}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div>
              <h2 className="text-xl font-bold">{discordUser.display_name}</h2>
            </div>
          </div>
        </Link>
        {/* Activity */}
        {discordActivities.length > 0 && (
          <div className="max-w-fit">
            {/* Playing */}
            {DiscordUtils.isPlayingActivity(discordActivities[0]) && (
              <div className="rounded-lg flex flex-col space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden">
                <div className="font-semibold">Playing a game</div>
                <div className="flex space-x-4 items-center">
                  {discordActivities[0].assets ? (
                    <div className="flex-shrink-0 relative">
                      <img
                        src={`https://cdn.discordapp.com/app-assets/${discordActivities[0].application_id}/${discordActivities[0].assets.large_image}.png`}
                        alt={discordActivities[0].assets.large_text}
                        className="w-20 h-20 rounded-lg"
                        draggable="false"
                      />
                      <img
                        src={`https://cdn.discordapp.com/app-assets/${discordActivities[0].application_id}/${discordActivities[0].assets.small_image}.png`}
                        alt={discordActivities[0].assets.small_text}
                        className="rounded-full bg-gray-100 bg-opacity-20 h-6 right-0 bottom-0 ring-4 ring-gray-100 ring-opacity-20 w-6 absolute"
                      />
                    </div>
                  ) : (
                    <Image
                      src={DiscordGameIcon}
                      width={80}
                      height={80}
                      alt={discordActivities[0].name}
                    />
                  )}

                  <div className="space-y-px w-80">
                    <h1 className="font-semibold text-lg leading-tight truncate">
                      {discordActivities[0].name}
                    </h1>
                    <h2 className="leading-tight opacity-90 line-clamp-1">
                      {discordActivities[0].details}
                    </h2>
                    <h3 className="leading-tight opacity-90 line-clamp-1">
                      {discordActivities[0].state}
                    </h3>
                    <h3 className="leading-tight opacity-90 line-clamp-1">
                      {elapsedTime} elapsed
                    </h3>
                  </div>
                </div>
              </div>
            )}
            {/* Listening */}
            {DiscordUtils.isListeningActivity(discordActivities[0]) &&
              SpotifyActivity && (
                <div className="rounded-lg flex flex-col space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden">
                  <div className="font-semibold">Listening to Spotify</div>
                  <div className="flex space-x-4 items-center">
                    {SpotifyActivity.album_art_url ? (
                      <div className="flex-shrink-0 relative">
                        <img
                          src={SpotifyActivity.album_art_url}
                          alt={SpotifyActivity.album}
                          className="w-20 h-20 rounded-lg"
                          draggable="false"
                        />
                      </div>
                    ) : (
                      <Image
                        src={DiscordGameIcon}
                        width={80}
                        height={80}
                        alt={"Listening to Spotify"}
                      />
                    )}

                    <div className="space-y-px w-80">
                      <h1 className="font-semibold text-lg leading-tight truncate">
                        {SpotifyActivity.song}
                      </h1>
                      <h2 className="leading-tight opacity-90 line-clamp-1">
                        by {SpotifyActivity.artist}
                      </h2>
                      <h3 className="leading-tight opacity-90 line-clamp-1">
                        on {SpotifyActivity.album}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscordProfileCard;
