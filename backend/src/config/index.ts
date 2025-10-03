import dotnev from "dotenv";
dotnev.config();

interface Config {
  port: number;
  nodeEnv: string;
  database_uri: string;
  database_name: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 7000,
  nodeEnv: process.env.NODE_ENV || "development",
  database_uri: String(process.env.DB_URI),
  database_name: String(process.env.DB_NAME),
};

export default config;
