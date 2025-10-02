import dotnev from "dotenv";
dotnev.config();

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 7000,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
