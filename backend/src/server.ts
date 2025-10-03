import app from "./app.ts";
import { connectDatabase } from "./config/db.ts";
import config from "./config/index.ts";

app.listen(config.port, (err) => {
  if (err) {
    console.error("error:", err);
  }

  console.log(`The Express application starts at port ${config.port}`);
});

connectDatabase();
