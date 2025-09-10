import "dotenv/config";
import createApp from "./app";

const port = Number(process.env.APP_PORT || 3310);
const app = createApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});
