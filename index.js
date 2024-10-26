const express = require("express");
const { handleScreenshot } = require("./screenshot");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

app.get("/scrape", async (req, res) => {
  const rawOptions = '%7B%22url%22%3A%22https%3A%2F%2Ftailwindcss.com%22%2C%22viewport%22%3A%7B%22width%22%3A320%2C%22height%22%3A568%7D%2C%22imageHeight%22%3A4096%7D';
  const options = JSON.parse(
    decodeURIComponent(rawOptions ?? '{}')
  );
  console.log('options', options);
  const screenshots = await handleScreenshot(options);
  res.status(200).json(screenshots);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
