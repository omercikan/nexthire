import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

interface Config {
  port: number;
  nodeEnv: string;
  database_uri: string;
  database_name: string;
  jwt_secret: string;
  saltRounds: number;
  client_url: string;
  rabbit_url: string;
  email_service: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 7000,
  nodeEnv: process.env.NODE_ENV || "development",
  database_uri: String(process.env.DB_URI),
  database_name: String(process.env.DB_NAME),
  jwt_secret: String(process.env.JWT_SECRET),
  saltRounds: 10,
  client_url: String(process.env.CLIENT_URL),
  rabbit_url: String(process.env.RABBIT_URL),
  email_service: {
    host: String(process.env.EMAIL_HOST),
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: String(process.env.EMAIL_USER),
      pass: String(process.env.EMAIL_PASS),
    },
  },
};

export default config;
