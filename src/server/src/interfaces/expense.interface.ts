import { Decimal } from "@prisma/client/runtime/library";

export interface Expense {
  id: number;
  description: string;
  totalAmount: Decimal;
  paidById: number;
  createdAt: Date;
}

export interface ExpenseCreate {
  description: string;
  totalAmount: Decimal;
  paidById: number;
}

export interface ExpenseUpdate {
  description?: string;
  totalAmount?: Decimal;
  paidById?: number;
}

export interface IExpenseRepository {
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  create(data: ExpenseCreate): Promise<Expense>;
  update(id: number, data: ExpenseUpdate): Promise<Expense>;
  delete(id: number): Promise<boolean>;
}
