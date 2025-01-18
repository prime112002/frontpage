const express = require("express");
const http = require("http");
const { setupWebSocket } = require("./config/websocket"); // Import WebSocket setup
const apiRoutes = require("./routes/api");
const { scrapeHackerNews } = require("./scraper/ scraper");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Initialize WebSocket
setupWebSocket(server);

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Scraper interval
setInterval(async () => {
  try {
    console.log("Initiating scheduled scraping...");
    await scrapeHackerNews(); // Call the correct function to scrape and broadcast
  } catch (error) {
    console.error("Error during scheduled scraping:", error.message);
  }
}, process.env.SCRAPER_INTERVAL);
