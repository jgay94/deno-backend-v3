import { Auditable } from "@domain/shared/mod.ts";
import { Repository } from "@infra/repository/mod.ts";
import { Id } from "@infra/storage/mod.ts";

/**
 * BaseServiceDeps is an interface that defines the dependencies required for the BaseService class.
 * It includes properties for the repository implementation and an optional system ID.
 *
 * @template T - The type of the items to be managed, which should extend the Auditable interface.
 */
export interface BaseServiceDeps<T extends Auditable> {
  /**
   * The repository implementation to use for the CRUD operations.
   */
  repository: Repository<T>;

  /**
   * The ID of the system user, which is used to populate the createdBy and lastUpdatedBy properties.
   */
  systemId?: Id;
}

/**
 * Service interface defines a generic service with CRUD operations for handling
 * entities that extend the Auditable interface. It extends the Repository interface
 * to include all CRUD methods provided by the repository.
 *
 * A service layer can handle business logic, validations, custom errors, and other
 * application-specific operations, while delegating data access responsibilities to the
 * repository layer.
 *
 * @template T - The type of the items to be managed, which should extend the Auditable interface.
 * @extends {Repository<T>} - Extends the Repository interface for the specific item type.
 */
export interface Service<T extends Auditable> extends Repository<T> {}
