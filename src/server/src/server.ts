import fastify, { FastifyInstance } from "fastify";
import { Router } from "@/routes/router";

const server: FastifyInstance = fastify({ logger: true });

Router(server);

server
  .listen({
    port: 3000,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on http://localhost:3000`);
  });
