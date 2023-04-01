import { Id, Identifiable } from "@infra/storage/mod.ts";

/**
 * An extension of the Identifiable interface that adds audit-related properties.
 * Can be extended by other interfaces or implemented by classes that require
 * audit information such as creation time, update time, and versioning.
 *
 * @extends {Identifiable} - Extends the Identifiable interface to include an id property.
 */
export interface Auditable extends Identifiable {
  /**
   * The date and time when the object was created.
   */
  readonly createdAt: Date;

  /**
   * The unique identifier of the user or system that created the object.
   */
  readonly createdBy: Id;

  /**
   * The date and time when the object was last updated.
   * This property is optional, as the object may not have been updated yet.
   */
  readonly lastUpdatedAt?: Date;

  /**
   * The unique identifier of the user or system that last updated the object.
   * This property is optional, as the object may not have been updated yet.
   */
  readonly lastUpdatedBy?: Id;

  /**
   * The current version number of the object, used for optimistic concurrency control.
   */
  readonly version: number;
}
