import { FastifyInstance } from "fastify";
import { UserRoutes } from "./user.route";
import { ExpenseRoutes } from "./expense.route";

export async function Router(fastify: FastifyInstance) {
  fastify.register(UserRoutes, { prefix: "/users" });
  fastify.register(ExpenseRoutes, { prefix: "/expenses" });
}
