const zmq = require('zeromq');

async function run() {
  const sock = new zmq.Subscriber();

  // Connect to the publisher's socket
  sock.connect("tcp://127.0.0.1:3000");
  sock.subscribe("topic");  // Subscribe to a topic
  console.log("Subscriber connected and waiting for messages...");

  for await (const [topic, message] of sock) {
    console.log(`Received message on ${topic}: ${message.toString()}`);
  }
}

run();