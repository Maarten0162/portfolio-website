import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/progresspicture/**'), new URL("https://placehold.net/*")],
  },
}

export default nextConfig;
 