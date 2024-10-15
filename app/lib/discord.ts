import {
  DiscordProfileData,
  ListeningActivity,
  PlayingActivity,
  DiscordUser,
  Activity,
  SpotifyActivity,
} from "@/types/discord";

export function initializeWebSocket(
  userID: string,
  onUpdate: (presence: any) => void
) {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.onopen = () => {
    console.log("Websocket connection opened");
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.op) {
      case 1: // Hello
        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: userID,
            },
          })
        );
        setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, message.d.heartbeat_interval);
        break;

      case 0: // Event
        if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
          onUpdate(message.d);
        }
        break;

      default:
        console.error("Unknown opcode:", message.op);
    }
  };

  ws.onerror = (error) => {
    console.error("Websocket error:", error);
  };

  ws.onclose = () => {
    console.log("Websocket connection closed");
  };

  return ws;
}

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
