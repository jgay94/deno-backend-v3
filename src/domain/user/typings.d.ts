import { Auditable } from "@domain/shared/mod.ts";

/**
 * A User interface that extends the Auditable interface to include user-specific properties.
 * Can be implemented by a User class or used as a type for user objects.
 *
 * @extends {Auditable} - Extends the Auditable interface to include audit-related properties.
 */
export interface User extends Auditable {
  /**
   * The first name of the user.
   */
  firstName: string;

  /**
   * The last name of the user.
   */
  lastName: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The hashed password of the user.
   */
  password: string;

  /**
   * The status of the user, represented by a UserStatus object.
   */
  status: UserStatus;
}

/**
 * A type alias for an object that represents the status of a user.
 * Includes properties for account activity, email verification, and account locking.
 */
export type UserStatus = {
  /**
   * A boolean value indicating whether the user's account is active.
   */
  isActive: boolean;

  /**
   * A boolean value indicating whether the user's email address has been verified.
   */
  isVerified: boolean;

  /**
   * A boolean value indicating whether the user's account is locked
   * due to failed login attempts or for security reasons.
   */
  isLocked: boolean;
};
