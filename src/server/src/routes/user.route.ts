import { FastifyInstance } from "fastify";
import { UserService } from "@/services/user.service";
import { UserCreate } from "@/interfaces/user.interface";

export async function UserRoutes(fastify: FastifyInstance) {
  const userService = new UserService();

  fastify.get("/", async (req, rep) => {
    const users = await userService.findAll();
    return rep.send(users);
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, rep) => {
    const { id } = req.params;
    const user = await userService.findById(Number(id));
    return rep.send(user);
  });

  fastify.post<{ Body: UserCreate }>("/", async (req, rep) => {
    const data = req.body;
    try {
      const user = await userService.create(data);
      return rep.send(user);
    } catch (error) {
      if (error instanceof Error) {
        return rep.status(400).send({ message: error.message });
      } else {
        return rep.status(400).send({ message: "An unknown error occurred" });
      }
    }
  });

  fastify.put<{ Body: UserCreate; Params: { id: string } }>(
    "/:id",
    async (req, rep) => {
      const { id } = req.params;
      const data = req.body;
      try {
        const user = await userService.update(Number(id), data);
        return rep.send(user);
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
      await userService.delete(Number(id));
      return rep.send({ message: "User deleted" });
    } catch (error) {
      if (error instanceof Error) {
        return rep.status(400).send({ message: error.message });
      } else {
        return rep.status(400).send({ message: "An unknown error occurred" });
      }
    }
  });
}
