//scraper.js
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../config/db");

let webSocketClients = [];

// this will do scraping the Hacker News
async function scrapeHackerNews() {
  try {
    console.log("Scraping stories from Hacker News...");
    const { data } = await axios.get("https://news.ycombinator.com/");
    const $ = cheerio.load(data);

    const stories = [];
    $(".athing").each((_, element) => {
      const title = $(element).find(".titleline a").text().trim();
      const url = $(element).find(".titleline a").attr("href");

      if (title && url) {
        stories.push({ title, url });
      }
    });

    console.log(`Found ${stories.length} stories. Inserting into database...`);

    const newStories = [];
    for (const story of stories) {
      const result = await db.query(
        "INSERT IGNORE INTO stories (title, url, created_at) VALUES (?, ?, NOW())",
        [story.title, story.url]
      );
      if (result.affectedRows > 0) {
        newStories.push(story);
      }
    }

    console.log("Scraping completed and stories stored in the database.");

    if (newStories.length > 0) {
      console.log("Broadcasting new stories to WebSocket clients...");
      webSocketClients.forEach((client) =>
        client.send(
          JSON.stringify({
            type: "new_stories",
            data: newStories,
          })
        )
      );
    }
  } catch (error) {
    console.error("Error while scraping Hacker News:", error.message);
  }
}

async function getRecentStoryCount() {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) as count FROM stories WHERE created_at >= NOW() - INTERVAL 5 MINUTE"
    );
    return rows[0].count || 0;
  } catch (error) {
    console.error("Error fetching recent story count:", error.message);
    return 0;
  }
}

// WebSocket connection handler
function handleWebSocketConnection(ws) {
  console.log("New WebSocket client connected!");
  webSocketClients.push(ws);

  getRecentStoryCount()
    .then((count) => {
      ws.send(
        JSON.stringify({
          type: "recent_story_count",
          count,
        })
      );
    })
    .catch((error) =>
      console.error(
        "Error sending recent story count to WebSocket client:",
        error.message
      )
    );

  // Remove client on disconnect
  ws.on("close", () => {
    console.log("WebSocket client disconnected.");
    webSocketClients = webSocketClients.filter((client) => client !== ws);
  });
}

module.exports = { scrapeHackerNews, handleWebSocketConnection };
