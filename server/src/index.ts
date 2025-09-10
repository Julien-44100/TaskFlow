import "dotenv/config";
import app from "./app/app.js";  // c’est déjà une instance Express

const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`✅ API listening on http://localhost:${port}`);
});
