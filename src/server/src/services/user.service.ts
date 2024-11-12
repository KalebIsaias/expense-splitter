import { IUserRepository, User, UserCreate } from "@/interfaces/user.interface";
import { UserRepository } from "@/repositories/user.repository";

class UserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(data: UserCreate): Promise<User> {
    return this.userRepository.create(data);
  }

  async update(id: number, data: UserCreate): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}

export { UserService };
