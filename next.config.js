module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Karolinskis",
        permanent: true,
      },
    ];
  },
};
