import "dotenv/config";
import app from "./app.js";

const port = Number(process.env.APP_PORT || 3310);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});
