import { prisma } from "@/database/prisma";
import {
  IUserRepository,
  User,
  UserCreate,
  UserUpdate,
} from "@/interfaces/user.interface";

class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const result = await prisma.user.findMany();

    return result;
  }

  async findById(id: number): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        photo: data.photo,
      },
    });

    return result;
  }

  async update(id: number, data: UserUpdate): Promise<User> {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        photo: data.photo,
      },
    });

    return result;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return true;
  }
}

export { UserRepository };
