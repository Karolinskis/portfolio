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
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/karolis-paulavicius/",
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
    ];
  },
};
