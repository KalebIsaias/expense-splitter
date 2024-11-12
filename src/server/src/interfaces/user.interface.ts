export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
}

export interface UserCreate {
  name: string;
  email: string;
  photo?: string;
}

export interface UserUpdate {
  name: string;
  email: string;
  photo?: string;
}

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(data: UserCreate): Promise<User>;
  update(id: number, data: UserUpdate): Promise<User>;
  delete(id: number): Promise<boolean>;
}
