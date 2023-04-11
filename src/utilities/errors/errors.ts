import { BaseError } from "./base.ts";

export class UpdateNotProvidedError extends BaseError<"UpdateNotProvidedError"> {
  constructor(message: string, cause?: unknown) {
    super({ name: "UpdateNotProvidedError", message, cause });
  }
}

export class NotFoundError extends BaseError<"NotFoundError"> {
  constructor(message: string, cause?: unknown) {
    super({ name: "NotFoundError", message, cause });
  }
}

export class ValidationError extends BaseError<"ValidationError"> {
  constructor(message: string, cause?: unknown) {
    super({ name: "ValidationError", message, cause });
  }
}

export class AuthenticationError extends BaseError<"AuthenticationError"> {
  constructor(message: string, cause?: unknown) {
    super({ name: "AuthenticationError", message, cause });
  }
}

export class DatabaseError extends BaseError<"DatabaseError"> {
  constructor(message: string, cause?: unknown) {
    super({ name: "DatabaseError", message, cause });
  }
}
