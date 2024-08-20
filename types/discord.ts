export interface SpotifyActivity {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  global_name: string;
  display_name: string;
  public_flags: number;
}

export interface PlayingActivity {
  id: string;
  name: string;
  type: number; // 0 = Game, 1 = Streaming, 2 = Listening, 3 = Custom
  state: string;
  details: string;
  timestamps: {
    start: number;
  };
  application_id: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  created_at: number;
}

export interface ListeningActivity {
  flags: number;
  id: string;
  name: string;
  type: number; // 0 = Game, 1 = Streaming, 2 = Listening, 3 = Custom
  state: string;
  session_id: string;
  details: string;
  timestamps: {
    start: number;
    end: number;
  };
  assets: {
    large_image: string;
    large_text: string;
    small_image: string;
    small_text: string;
  };
  sync_id: string;
  created_at: number;
  party?: {
    id: string;
  };
}

export type Activity = PlayingActivity | ListeningActivity;

export interface DiscordProfileData {
  kv?: Record<string, unknown>;
  listening_to_spotify: boolean;
  spotify?: SpotifyActivity;
  discord_user: DiscordUser;
  activities?: Activity[];
  discord_status: string;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}
