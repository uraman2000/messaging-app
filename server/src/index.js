const http = require("http");
const WebSocket = require("ws");

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("HTTP server running");
});

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws, request) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  // Check if the WebSocket connection is for the /chat endpoint
  if (pathname === "/chat") {
    console.log("A client connected to /chat");

    // Broadcast a message to all clients
    const broadcast = (data) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      // Broadcast the received message to all connected clients
      broadcast(message);
    });

    ws.on("close", () => {
      console.log("A client disconnected from /chat");
    });
  } else {
    // Handle other endpoints or close the connection if not matched
    ws.close(1000, "Endpoint not supported");
  }
});

// Integrate the WebSocket server with the HTTP server
server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  if (pathname === "/chat") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
