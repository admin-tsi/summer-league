/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.nba.com",
      "summer-league-storage.s3.eu-north-1.amazonaws.com",
      "s3-alpha-sig.figma.com",
      "cdn.pixabay.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "summer-league-backend-staging.up.railway.app",
        pathname: "/uploads/players/profiles/**",
      },
    ],
  },
};

export default nextConfig;
