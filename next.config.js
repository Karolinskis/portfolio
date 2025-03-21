module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Karolinskis",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/users/213366470556516354",
        permanent: true,
      },
      {
        source: "/steam",
        destination: "https://steamcommunity.com/id/Karolinskiss/",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/Karolinskiss",
        permanent: true,
      },
      {
        source: "/bluesky",
        destination: "https://bsky.app/profile/karolinskis.bsky.social",
        permanent: true,
      },
    ];
  },
};
