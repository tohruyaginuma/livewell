export class NotFoundError extends Error {
  constructor(message: string = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string = "Validation failed") {
    super(message);
    this.name = "ValidationError";
  }
}
