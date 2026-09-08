import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#17302d", moss: "#315e55", jade: "#749b82", paper: "#f7f4ed", mist: "#e9eee8", gold: "#b58a48", clay: "#a96149" }, fontFamily: { serif: ["Iowan Old Style", "Baskerville", "STSong", "serif"] } } }, plugins: [] };
export default config;
