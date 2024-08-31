class HttpError extends Error {
  public status: number;
  public originalError?: Error;
  public data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { HttpError };
