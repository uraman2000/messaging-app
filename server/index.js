const zmq = require("zeromq");

async function run() {
  const sock = new zmq.Reply();

  await sock.bind("tcp://127.0.0.1:3000");
  console.log("Server is listening on port 3000");

  for await (const [msg] of sock) {
    console.log(`Received request: ${msg.toString()}`);
    const response = `Received: ${msg.toString()}`;
    await sock.send(response);
  }
}

run();
