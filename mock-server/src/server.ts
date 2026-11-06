import express from "express";
import cors from "cors";

/**
 * This is placeholder scaffolding, not the interview exercise. Its only job
 * is to prove the toolchain works end to end before the live session: a
 * running Express server that the Angular app can reach through the dev
 * proxy. The real server-side logic is swapped in live.
 */

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/ping", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Scaffold mock server listening on port ${port}`);
});
