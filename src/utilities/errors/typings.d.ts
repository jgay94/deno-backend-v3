/**
 * Represents a custom error with a name, message, and an optional cause.
 * @template T - The string literal type representing the error name.
 * @template C - The type representing the error cause, defaults to unknown.
 */
export type CustomError<TName extends string, UCause = unknown> = {
  /**
   * The name of the error.
   */
  name: TName;

  /**
   * A description of the error.
   */
  message: string;

  /**
   * Optional information about the cause of the error.
   */
  cause?: UCause;

  /**
   * The stack trace of the error.
   */
  stack?: string;
};
