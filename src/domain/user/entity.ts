import { Id } from "@infra/storage/mod.ts";
import { User, UserStatus } from "./typings.d.ts";

/**
 * A UserEntity class that implements the User interface.
 * Represents a user entity with user-specific properties and audit-related properties.
 *
 * @implements {User} - Implements the User interface.
 */
export class UserEntity implements User {
  public readonly id: Id;
  public readonly createdAt: string;
  public readonly createdBy: Id;
  public readonly lastUpdatedAt?: string;
  public readonly lastUpdatedBy?: Id;
  public readonly version: number;

  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public status: UserStatus;

  /**
   * Constructs a User instance with the given properties.
   * @param {User} user - An object containing the properties for the User entity.
   */
  constructor(user: User) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.createdBy = user.createdBy;
    this.lastUpdatedAt = user.lastUpdatedAt;
    this.lastUpdatedBy = user.lastUpdatedBy;
    this.version = user.version;

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
  }

  /**
   * Returns the full name of the user.
   * @returns {string} The full name of the user, formatted as "firstName lastName".
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Returns the initials of the user's first and last name.
   * @returns {string} The initials of the user's first and last name, formatted as "FL".
   */
  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`;
  }
}
