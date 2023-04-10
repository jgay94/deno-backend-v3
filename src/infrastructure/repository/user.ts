import { Storage } from "@infra/storage/mod.ts";
import { NotFoundError } from "@utils/errors/mod.ts";
import { User, UserRepository } from "@domain/user/mod.ts";

import { BaseRepository } from "./base.ts";

/**
 * UserRepositoryImpl is a class that extends the BaseRepository class and implements the UserRepository interface.
 * It provides methods for working with User entities in the storage.
 *
 * @extends {BaseRepository<User>} - Extends the BaseRepository class with the User type.
 * @implements {UserRepository} - Implements the UserRepository interface.
 */
export class UserRepositoryImpl extends BaseRepository<User> implements UserRepository {
  /**
   * Constructs a new instance of the UserRepositoryImpl class.
   *
   * @param storage - The storage implementation to use for the CRUD operations.
   */
  constructor(storage: Storage<User>) {
    super({ storage });
  }

  public async getByUsername(username: string): Promise<User> {
    const users = await this.storage.getAll();
    const user = users.find((user) => user.username === username);

    if (!user) {
      throw new NotFoundError(`User with username ${username} not found.`);
    }

    return user;
  }
}
