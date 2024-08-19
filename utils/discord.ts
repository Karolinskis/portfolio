import { DiscordProfileData } from "@/@types/discord";

export const fetchDiscordProfile = async (
  userID: string
): Promise<DiscordProfileData> => {
  const response = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
  const { data } = (await response.json()) as { data: DiscordProfileData };
  return data;
};
