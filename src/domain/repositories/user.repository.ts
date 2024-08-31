import { User } from "../models/user";

class UserRepository {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(userId: string): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  add(user: User): void {
    this.users.push(user);
  }

  update(userId: string, updatedUser: Partial<User>): User | undefined {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index === -1) {
      return undefined;
    }

    this.users[index].update(updatedUser);
    return this.users[index];
  }

  delete(userId: string): boolean {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}

// create a repository singleton instance
export const userRepository = new UserRepository();
