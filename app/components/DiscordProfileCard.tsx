"use client";
import React, { useState, useEffect } from "react";
import Tooltip from "./Tooltip";

function DiscordProfileCard({ userID }: { userID: string | undefined }) {
  const [profile, setProfile] = useState({
    picture: "",
    username: "",
    display_name: "",
    status: "",
  });

  const [activity, setActivity] = useState({
    name: "",
    state: "",
    details: "",
    large_image: "",
    large_text: "",
    small_image: "",
    small_text: "",
  });

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        const { discord_status, discord_user, activities } = data.data;
        setProfile({
          picture: `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.gif`,
          username: discord_user.username,
          display_name: discord_user.display_name,
          status: discord_status,
        });
        console.log(activities);
        if (activities.length > 0) {
          const {
            application_id,
            name,
            state,
            details,
            large_image = activities[0].assets.large_image,
            large_text = activities[0].assets.large_text,
            small_image = activities[0].assets.small_image,
            small_text = activities[0].assets.small_text,
          } = activities[0];
          setActivity({
            name: name,
            state: state,
            details: details,
            large_image: `https://cdn.discordapp.com/app-assets/${application_id}/${large_image}.png`,
            large_text: large_text,
            small_image: `https://cdn.discordapp.com/app-assets/${application_id}/${small_image}.png`,
            small_text: small_text,
          });
        }
      })
      .catch((error) =>
        console.error("Error fetching Discord profile:", error)
      );
  }, []);

  if (userID === undefined) return null;

  return (
    <div className="dark:bg-gradient-to-r dark:from-neutral-800 dark:to-zinc-800 bg-gradient-to-r from-neutral-200 to-zinc-200 rounded-lg shadow-xl p-4 flex justify-between gap-2">
      <div>
        <div className="flex items-center mb-2 ml-2">
          <div className="relative">
            <Tooltip text={profile.status}>
              <img
                src={profile.picture}
                alt={profile.username}
                className="w-12 h-12 rounded-full mr-4"
              />
              {profile.status === "offline" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-gray-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
              {profile.status === "online" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
              {profile.status === "idle" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-yellow-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
              {profile.status === "dnd" && (
                <span className="bottom-0 left-10 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </Tooltip>
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.display_name}</h2>
          </div>
        </div>
        {/* Activity */}
        {activity.name && (
          <div className="rounded-lg flex flex-col space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden">
            <div className="flex space-x-4 items-center">
              <div className="flex-shrink-0 relative">
                <img
                  src={activity.large_image}
                  alt={activity.large_text}
                  className="w-28 h-28 rounded-lg"
                  draggable="false"
                />
                <img
                  src={activity.small_image}
                  alt={activity.small_text}
                  className="rounded-full bg-gray-100 bg-opacity-20 h-6 right-0 bottom-0 ring-4 ring-gray-100 ring-opacity-20 w-6 absolute"
                />
              </div>
              <div className="space-y-px">
                <h1 className="font-semibold text-lg leading-tight truncate">
                  {activity.name}
                </h1>
                <h2 className="leading-tight opacity-90 line-clamp-2">
                  {activity.details}
                </h2>
                <h3 className="leading-tight opacity-90 line-clamp-2">
                  {activity.state}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscordProfileCard;
