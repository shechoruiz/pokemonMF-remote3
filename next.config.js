/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "pokeremote3",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          pokehost:
            "pokehost@http://localhost:3000/_next/static/chunks/remoteEntry.js",
        },
        exposes: {
          "./Pokemon3": "./components/Pokemon3",
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
