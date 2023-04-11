export type { CustomError } from "./typings.d.ts";

export { BaseError } from "./base.ts";
export { isCustomError } from "./helpers.ts";

export {
  AuthenticationError,
  DatabaseError,
  NotFoundError,
  UpdateNotProvidedError,
  ValidationError,
} from "./errors.ts";
