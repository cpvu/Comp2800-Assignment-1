import { expressInstance } from "./server.js";
import http from "http";

(async () => {
  const server = http.createServer(expressInstance());

  server.listen("8000", () => {
    console.log(`Listening on 8000}`);
  });
})();
