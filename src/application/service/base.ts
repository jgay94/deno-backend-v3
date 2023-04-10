import { Auditable, NewAuditable } from "@domain/shared/mod.ts";
import { Repository } from "@infra/repository/mod.ts";
import { Id } from "@infra/storage/mod.ts";
import { NotFoundError } from "@utils/errors/mod.ts";

import { BaseServiceDeps, Service } from "./typings.d.ts";

/**
 * BaseService is an abstract class that implements the Service interface.
 * It serves as a base class for services and provides a thin layer over the
 * repository, delegating CRUD operations to the repository instance.
 * This class can be extended by other service classes to provide domain-specific methods.
 *
 * @template T - The type of the items to be managed, which should extend the Auditable interface.
 * @implements {Service<T>} - Implements the Service interface for the specific item type.
 */
export abstract class BaseService<T extends Auditable> implements Service<T> {
  protected repository: Repository<T>;
  protected systemId: Id;

  /**
   * Constructs a new instance of the BaseService class.
   *
   * @param deps - An object containing the dependencies for the BaseService.
   */
  constructor(deps: BaseServiceDeps<T>) {
    this.repository = deps.repository;
    this.systemId = deps.systemId ?? "system";
  }

  public async getAll(): Promise<T[]> {
    return await this.repository.getAll();
  }

  public async getById(id: Id): Promise<T> {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new NotFoundError(`Item with ID ${id} not found.`);
    }
    return item;
  }

  public async create(item: NewAuditable<T>): Promise<T> {
    return await this.repository.create(item);
  }

  public async update(id: string, item: Partial<T>): Promise<T> {
    if (Object.keys(item).length === 0) {
      throw new Error("No updates provided.");
    }

    const updatedItem = await this.repository.update(id, item);
    if (!updatedItem) {
      throw new NotFoundError(`Item with ID ${id} not found.`);
    }
    return updatedItem;
  }

  public async upsert(item: NewAuditable<T> | T): Promise<T> {
    return await this.repository.upsert(item);
  }

  public async delete(id: Id): Promise<boolean> {
    return await this.repository.delete(id);
  }

  public async clear(): Promise<void> {
    return await this.repository.clear();
  }

  public async exists(id: Id): Promise<boolean> {
    return await this.repository.exists(id);
  }

  public async count(): Promise<number> {
    return await this.repository.count();
  }
}
