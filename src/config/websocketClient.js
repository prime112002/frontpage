const WebSocket = require("ws");

// it will Connect to the WebSocket server
const ws = new WebSocket("ws://localhost:5000"); // Adjust the port to match your main server's port

// When the connection is opened it shows like
ws.on("open", () => {
  console.log("WebSocket connection established!");
});

// When a message is received from the server!
ws.on("message", (message) => {
  try {
    // Convert the message from buffer to JSON
    const parsedMessage = JSON.parse(message.toString());
    console.log("Message from server:", parsedMessage);
  } catch (error) {
    console.error("Error parsing message:", error.message);
  }
});

// When the connection is closed
ws.on("close", () => {
  console.log("WebSocket connection closed.");
});

// Handle connection errors
ws.on("error", (error) => {
  console.error("WebSocket error:", error.message);
});
