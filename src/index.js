import { expressInstance } from "./server.js";
import http from "http";

(async () => {
  const server = http.createServer(expressInstance());

  server.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}}`);
  });
})();
