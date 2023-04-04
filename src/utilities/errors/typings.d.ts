/**
 * Represents a custom error with a name, message, and an optional cause.
 * @template T - The string literal type representing the error name.
 * @template C - The type representing the error cause, defaults to unknown.
 */
export type CustomError<T extends string, C = unknown> = {
  /**
   * The name of the error.
   */
  name: T;

  /**
   * A description of the error.
   */
  message: string;

  /**
   * Optional information about the cause of the error.
   */
  cause?: C;
};
