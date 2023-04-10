import { Id, Storage } from "@infra/storage/mod.ts";
import { Auditable, NewAuditable } from "@domain/shared/mod.ts";
import { NotFoundError } from "@utils/errors/mod.ts";

import { Repository, BaseRepositoryDeps } from "./typings.d.ts";

/**
 * BaseRepository is an abstract class that implements the Repository interface.
 * It serves as a base class for repositories and provides CRUD operations for entities
 * that extend the Auditable interface. This class can be extended
 * by other repository classes to provide domain-specific methods.
 *
 * @template T - The type of the items to be managed, which should extend the Auditable interface.
 * @implements {Repository<T>} - Implements the Repository interface for the specific item type.
 */
export abstract class BaseRepository<T extends Auditable> implements Repository<T> {
  protected storage: Storage<T>;
  protected systemId: Id;

  /**
   * Constructs a new instance of the BaseRepository class.
   * 
   * @param deps - An object containing the dependencies for the BaseRepository.
   */
  constructor(deps: BaseRepositoryDeps<T>) {
    this.storage = deps.storage;
    this.systemId = deps.systemId ?? "system";
  }

  public async getAll(): Promise<T[]> {
    const items = await this.storage.getAll();
    return items;
  }

  public async getById(id: Id): Promise<T> {
    const item = await this.storage.getById(id);
    if (!item) {
      throw new NotFoundError(`Item with ID ${id} not found.`);
    }
    return item;
  }

  public async create(item: NewAuditable<T>): Promise<T> {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const createdBy = this.systemId; // Replace with actual user ID or system identifier
    const version = 1;

    const newItem = {
      ...item,
      id,
      createdAt,
      createdBy,
      version,
    } as unknown as T;

    const createdItem = await this.storage.create(newItem);
    return createdItem;
  }

  public async update(id: Id, item: Partial<T>): Promise<T> {
    const currentItem = await this.storage.getById(id);
    if (!currentItem) {
      throw new NotFoundError(`Item with ID ${id} not found for update.`);
    }

    const lastUpdatedAt = new Date().toISOString();
    const lastUpdatedBy = this.systemId; // Replace with actual user ID or system identifier
    const version = currentItem.version + 1;

    const updatedItem = {
      ...currentItem,
      ...item,
      lastUpdatedAt,
      lastUpdatedBy,
      version,
    } as T;

    const result = await this.storage.update(id, updatedItem);
    if (!result) {
      throw new NotFoundError(`Item with ID ${id} not found for update.`);
    }
    return result;
  }

  public async upsert(item: NewAuditable<T> | T): Promise<T> {
    if ("id" in item) {
      const updatedItem = await this.update(item.id, item);
      return updatedItem;
    } else {
      const createdItem = await this.create(item as NewAuditable<T>);
      return createdItem;
    }
  }

  public async delete(id: Id): Promise<boolean> {
    const deleted = await this.storage.delete(id);
    return deleted;
  }

  public async clear(): Promise<void> {
    await this.storage.clear();
  }

  public async exists(id: Id): Promise<boolean> {
    const itemExists = await this.storage.exists(id);
    return itemExists;
  }

  public async count(): Promise<number> {
    const itemCount = await this.storage.count();
    return itemCount;
  }
}
