import "dotenv/config";
import createApp from "./app/app.js";

const port = process.env.APP_PORT || 3001;
const app = createApp(process.env.NODE_ENV);

app.listen(port, () => {
  console.log(`✅ API listening on http://localhost:${port}`);
});
