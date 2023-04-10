import { Id, Storage } from "@infra/storage/mod.ts";
import { Auditable, NewAuditable } from "@domain/shared/mod.ts";

/**
 * BaseRepositoryDeps is an interface that defines the dependencies required for the BaseRepository class.
 * It includes properties for the storage implementation and an optional system ID.
 *
 * @template T - The type of the items to be managed, which should extend the Auditable interface.
 */
export interface BaseRepositoryDeps<T extends Auditable> {
  /**
   * The storage implementation to use for the CRUD operations.
   */
  storage: Storage<T>;

  /**
   * The ID of the system user, which is used to populate the createdBy and lastUpdatedBy properties.
   */
  systemId?: Id;
}

/**
 * Repository interface defines a generic repository with CRUD operations for handling
 * entities that extend the Auditable interface.
 *
 * @template T - The type of the items to be managed, which should extend the Auditable interface.
 * @extends {Storage<T>} - Extends the Storage interface for the specific item type.
 */
export interface Repository<T extends Auditable> extends Storage<T> {
  create(item: NewAuditable<T>): Promise<T>;
  upsert(item: NewAuditable<T> | T): Promise<T>;
}
