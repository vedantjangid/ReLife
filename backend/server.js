// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/feed", (req, res) => {
  res.json({
    user: {
      avatar: "https://via.placeholder.com/40",
    },
    favorites: Array(11)
      .fill()
      .map((_, i) => ({
        avatar: `https://via.placeholder.com/56?text=User${i + 1}`,
      })),
    liveStreams: [
      {
        title: "WINDS OF DESTINY",
        creator: "Ronald",
        time: "2m",
        viewers: "86.4K",
        thumbnail: "https://via.placeholder.com/180x240?text=WINDS+OF+DESTINY",
      },
      {
        title: "THREADS OF FATE",
        creator: "Cody Ray",
        time: "1h",
        thumbnail: "https://via.placeholder.com/180x240?text=THREADS+OF+FATE",
      },
      // Add more live streams as needed
    ],
    popularVideos: [
      {
        title: "Video 1",
        thumbnail: "https://via.placeholder.com/180x240?text=Video+1",
        duration: "0:24",
      },
      {
        title: "Video 2",
        thumbnail: "https://via.placeholder.com/180x240?text=Video+2",
        duration: "1:15",
      },
      // Add more popular videos as needed
    ],
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
