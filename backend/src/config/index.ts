import dotnev from "dotenv";
dotnev.config();

interface Config {
  port: number;
  nodeEnv: string;
  database_uri: string;
  database_name: string;
  jwt_secret: string;
  saltRounds: number;
  client_url: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 7000,
  nodeEnv: process.env.NODE_ENV || "development",
  database_uri: String(process.env.DB_URI),
  database_name: String(process.env.DB_NAME),
  jwt_secret: String(process.env.JWT_SECRET),
  saltRounds: 10,
  client_url: String(process.env.CLIENT_URL),
};

export default config;
