const express = require("express");
const handleScreenshot = require("./screenshot");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", async (req, res) => {
  const options = {
    url: 'https%3A%2F%2Ftailwindcss.com',
    viewport: {
      width: 320,
      height: 568,
    },
    imageHeight: 3900
  };

  const screenshots = await handleScreenshot(options);
  res.status(200).json(screenshots);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
