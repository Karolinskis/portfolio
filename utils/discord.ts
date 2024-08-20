import {
  DiscordProfileData,
  ListeningActivity,
  PlayingActivity,
  DiscordUser,
  Activity,
  SpotifyActivity,
} from "@/types/discord";

export const fetchDiscordProfile = async (
  userID: string
): Promise<DiscordProfileData> => {
  const response = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
  const { data } = (await response.json()) as { data: DiscordProfileData };
  return data;
};

export const fetchListeningActivity = async (
  userID: string
): Promise<ListeningActivity[]> => {
  const profileData = await fetchDiscordProfile(userID);
  return profileData.activities?.filter(
    (activity) => activity.type === 2
  ) as ListeningActivity[];
};

export const fetchDiscordActivities = async (
  userID: string
): Promise<Activity[]> => {
  const profileData = await fetchDiscordProfile(userID);
  return profileData.activities as Activity[];
};

export const fetchPlayingActivity = async (
  userID: string
): Promise<PlayingActivity[]> => {
  const profileData = await fetchDiscordProfile(userID);
  return profileData.activities?.filter(
    (activity) => activity.type === 0
  ) as PlayingActivity[];
};

export const fetchSpotifyActivity = async (
  userID: string
): Promise<SpotifyActivity | null> => {
  const profileData = await fetchDiscordProfile(userID);
  return profileData.spotify || null;
};

export const fetchDiscordUserProfile = async (
  userID: string
): Promise<DiscordUser> => {
  const profileData = await fetchDiscordProfile(userID);
  return profileData.discord_user;
};

export const fetchDiscordUserStatus = async (
  userID: string
): Promise<string> => {
  const profileData = await fetchDiscordProfile(userID);
  return profileData.discord_status;
};

export function isPlayingActivity(
  activity: Activity
): activity is PlayingActivity {
  return activity.type === 0;
}

export function isListeningActivity(
  activity: Activity
): activity is ListeningActivity {
  return activity.type === 2;
}
