import getUniqueId from "../../core/util/uuid";

class User {
  public id: string;
  public name: string;
  public email: string;
  private password: string;

  constructor(params: { name: string; email: string; password: string }) {
    this.id = getUniqueId({ prefix: "user" });
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
  }

  setPassword = (password: string): void => {
    this.password = password;
  };

  getPassword = (): string => this.password;

  update = (params: { name?: string; email?: string }): void => {
    this.name = params.name || this.name;
    this.email = params.email || this.email;
  };

  toJSON(): { id: string; name: string; email: string } {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

export { User };
