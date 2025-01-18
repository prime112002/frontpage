const WebSocket = require("ws");
const db = require("../config/db");

let wss;

// this is a Function to set up WebSocket server
function setupWebSocket(server) {
  wss = new WebSocket.Server({ server });

  // When a new client connects it shows like
  wss.on("connection", async (ws) => {
    console.log("New WebSocket client connected!");

    // it will Send the count of stories published in the last 5 minutes on connection
    try {
      const [results] = await db.query();
      ws.send(
        JSON.stringify({ type: "recent_story_count", count: results[0].count })
      );
    } catch (error) {
      console.error("Error fetching recent story count:", error.message);
    }

    ws.on("message", (message) => {
      console.log("Received message from client:", message);
    });

    // this for Handle client disconnection
    ws.on("close", () => {
      console.log("WebSocket client disconnected.");
    });
  });
}

// this Function to broadcast new stories to all connected
function broadcastNewStories(newStories) {
  if (!wss) {
    console.error("WebSocket server is not set up yet!");
    return;
  }

  const message = JSON.stringify({
    type: "new_stories",
    data: newStories,
  });

  // Broadcast the message to all connected
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = { setupWebSocket, broadcastNewStories };
