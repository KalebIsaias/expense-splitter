import {
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
} from "@/interfaces/expense.interface";
import { ExpenseRepository } from "@/repositories/expense.repository";
import { UserRepository } from "@/repositories/user.repository";

class ExpenseService {
  private expenseRepository: ExpenseRepository;
  private userRepository: UserRepository;

  constructor() {
    this.expenseRepository = new ExpenseRepository();
    this.userRepository = new UserRepository();
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.findAll();
  }

  async findById(id: number): Promise<Expense | null> {
    return this.expenseRepository.findById(id);
  }

  async create(data: ExpenseCreate): Promise<Expense> {
    const user = await this.userRepository.findById(data.paidById);
    if (!user) {
      throw new Error("User not found");
    }

    return this.expenseRepository.create(data);
  }

  async update(id: number, data: ExpenseUpdate): Promise<Expense> {
    return this.expenseRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.expenseRepository.delete(id);
  }
}

export { ExpenseService };
