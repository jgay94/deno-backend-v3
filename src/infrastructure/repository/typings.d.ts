import { Storage } from "@infra/storage/mod.ts";
import { Auditable, NewAuditable } from "@domain/shared/mod.ts";

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
