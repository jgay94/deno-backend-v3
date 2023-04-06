import { CustomError } from "./typings.d.ts";

/**
 * Checks if the given error object is an instance of a CustomError.
 * 
 * @param error - The error object to check.
 * @returns A boolean indicating if the error object is an instance of a CustomError.
 */
export function isCustomError(error: unknown): error is CustomError<string> {
  return (
    typeof error === "object" 
      && error !== null 
      && "name" in error 
      && "message" in error
  );
}
