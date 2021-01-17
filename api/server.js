require("dotenv").config();

const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8080;

const server = http.createServer(app);

console.log("now listening on port " + port);
server.listen(port);
