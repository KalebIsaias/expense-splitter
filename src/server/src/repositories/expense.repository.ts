import { prisma } from "@/database/prisma";
import {
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
  IExpenseRepository,
} from "@/interfaces/expense.interface";

class ExpenseRepository implements IExpenseRepository {
  async findAll(): Promise<Expense[]> {
    const result = await prisma.expense.findMany();

    return result;
  }

  async findById(id: number): Promise<Expense | null> {
    const result = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: ExpenseCreate): Promise<Expense> {
    const result = await prisma.expense.create({
      data: {
        description: data.description,
        totalAmount: data.totalAmount,
        paidById: data.paidById,
      },
    });

    return result;
  }

  async update(id: number, data: ExpenseUpdate): Promise<Expense> {
    const result = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        description: data.description,
        totalAmount: data.totalAmount,
        paidById: data.paidById,
      },
    });

    return result;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return true;
  }
}

export { ExpenseRepository };
