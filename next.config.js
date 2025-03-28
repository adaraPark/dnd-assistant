/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["www.pokemon.com", "img.pokemondb.net", "assets.pokemon.com"], // allowing pokemon images to be loaded since this is a dev only project
  },
};

export default config;
