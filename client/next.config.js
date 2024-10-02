// next.config.js

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cloud.appwrite.io",
      "api.dicebear.com",
      "media.licdn.com",
      "miro.medium.com",
      "placehold.co",
      "avatar.iran.liara.run",
      "cdn.pixabay.com",
      "images.pexels.com",
    ],
    dangerouslyAllowSVG: true, // Enable SVG support
  },
};
