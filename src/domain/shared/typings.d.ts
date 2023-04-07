import { Id, Identifiable } from "@infra/storage/mod.ts";

/**
 * A utility type that takes a type `T` that extends the Auditable interface and
 * returns a new type with the same properties as `T` but with the audit-related
 * properties and 'id' omitted. This is useful for creating new instances of an
 * auditable object without specifying the audit-related properties, which should
 * be handled by the repository layer.
 *
 * @template T - The type of the Auditable object to create a new version of, with audit-related properties omitted.
 */
export type NewAuditable<T extends Auditable> = Omit<
  T,
  | "id"
  | "createdAt"
  | "createdBy"
  | "lastUpdatedAt"
  | "lastUpdatedBy"
  | "version"
>;

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
  readonly createdAt: string;

  /**
   * The unique identifier of the user or system that created the object.
   */
  readonly createdBy: Id;

  /**
   * The date and time when the object was last updated.
   * This property is optional, as the object may not have been updated yet.
   */
  readonly lastUpdatedAt?: string;

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
