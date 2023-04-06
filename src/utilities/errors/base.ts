import { CustomError } from "./typings.d.ts";

/**
 * Base class for custom errors with a name, message, and an optional cause.
 * 
 * @template T - The string literal type representing the error name.
 * @template C - The type representing the error cause, defaults to unknown.
 * @extends Error
 */
export class BaseError<T extends string, C = unknown> extends Error {
  public name: T;
  public message: string;
  public cause?: C;

  /**
   * Constructs a new custom error instance.
   * @param {CustomError<T, C>} error - An object containing the name, message, and an optional cause for the error.
   */
  constructor(error: CustomError<T, C>) {
    super(error.message);
    this.message = error.message;
    this.name = error.name as T;
    this.cause = error.cause;

    // if available, ensures that the stack trace starts from the constructor of the derived error class
    // and excludes the internal implementation details of the BaseError class.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
