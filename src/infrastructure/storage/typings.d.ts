/**
 * A generic interface representing an identifiable object with a unique ID.
 * Can be extended by other interfaces or implemented by classes that require
 * a unique identifier property.
 */
export interface Identifiable {
  /**
   * The unique identifier of the object.
   */
  readonly id: Id;
}

/**
 * A type alias for a string that represents a unique identifier.
 */
export type Id = string;
