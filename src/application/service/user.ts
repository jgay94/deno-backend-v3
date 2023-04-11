import {
  CreateUserInput,
  UpdateUserInput,
  UpsertUserInput,
  User,
  UserRepository,
  UserService,
} from "@domain/user/mod.ts";
import { NotFoundError, UpdateNotProvidedError } from "@utils/errors/mod.ts";
import { Id } from "@infra/storage/mod.ts";
import { log } from "@utils/logger/mod.ts";

import { BaseService } from "./base.ts";

export class UserServiceImpl extends BaseService<User> implements UserService {
  constructor(private userRepository: UserRepository) {
    super({ repository: userRepository });
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.userRepository.getByUsername(username);
    log.debug(`User with username ${username} fetched.`);
    return user;
  }

  async create(input: CreateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(input);
    log.info(`User with ID ${newUser.id} created.`);
    return newUser;
  }
  
  async update(id: Id, input: UpdateUserInput): Promise<User> {
    // Check if input object has any provided properties
    if (Object.keys(input).length === 0) {
      log.error("No properties provided for updating the user.");
      throw new UpdateNotProvidedError("No properties provided for updating the user.");
    }
  
    const updatedUser = await this.userRepository.update(id, input);
    if (!updatedUser) {
      log.error(`User with ID ${id} not found.`);
      throw new NotFoundError(`User with ID ${id} not found.`);
    }
    log.info(`User with ID ${id} updated.`);
    return updatedUser;
  }
  
  async upsert(input: UpsertUserInput): Promise<User> {
    const upsertedUser = await this.userRepository.upsert(input);
    log.info(`User with ID ${upsertedUser.id} upserted.`);
    return upsertedUser;
  }
}
