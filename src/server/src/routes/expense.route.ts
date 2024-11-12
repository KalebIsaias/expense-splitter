import { ExpenseCreate } from "@/interfaces/expense.interface";
import { ExpenseService } from "@/services/expense.service";
import { FastifyInstance } from "fastify";

export async function ExpenseRoutes(fastify: FastifyInstance) {
  const expenseService = new ExpenseService();

  fastify.get("/", async (req, rep) => {
    const expenses = await expenseService.findAll();
    return rep.send(expenses);
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, rep) => {
    const { id } = req.params;
    const expense = await expenseService.findById(Number(id));
    return rep.send(expense);
  });

  fastify.post<{ Body: ExpenseCreate }>("/", async (req, rep) => {
    const data = req.body;
    try {
      const expense = await expenseService.create(data);
      return rep.send(expense);
    } catch (error) {
      if (error instanceof Error) {
        return rep.status(400).send({ message: error.message });
      } else {
        return rep.status(400).send({ message: "An unknown error occurred" });
      }
    }
  });

  fastify.put<{ Body: ExpenseCreate; Params: { id: string } }>(
    "/:id",
    async (req, rep) => {
      const { id } = req.params;
      const data = req.body;
      try {
        const expense = await expenseService.update(Number(id), data);
        return rep.send(expense);
      } catch (error) {
        if (error instanceof Error) {
          return rep.status(400).send({ message: error.message });
        } else {
          return rep.status(400).send({ message: "An unknown error occurred" });
        }
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, rep) => {
    const { id } = req.params;
    try {
      await expenseService.delete(Number(id));
      return rep.send({ message: "Expense deleted" });
    } catch (error) {
      if (error instanceof Error) {
        return rep.status(400).send({ message: error.message });
      } else {
        return rep.status(400).send({ message: "An unknown error occurred" });
      }
    }
  });
}
