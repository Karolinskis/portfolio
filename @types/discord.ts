export interface DiscordProfileData {
  kv?: {};
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    bot: boolean;
    global_name: string;
    avatar_decoration_data: {};
    display_name: string;
    public_flags: number;
  };
  activities?: [
    {
      id: string;
      name: string;
      type: number; // 0 = Game, 1 = Streaming, 2 = Listening, 3 = Custom
      state: string;
      details: string;
      timestamps: {
        start: number;
        end?: number;
      };
      application_id: string;
      assets: {
        large_image: string;
        large_text: string;
        small_image: string;
        small_text: string;
      };
    }
  ];
  discord_status: string;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}
