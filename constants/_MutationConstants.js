/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

/**
 * Provides common contants for mutating a store locally
 */
export const ActionTypes = {
  // Deprecated - prefer to use formState to build your forms
  // change a single record in the store
  CHANGE: "CHANGE",

  // Deprecated - prefer to use formState to build your forms
  // change a single record in the store without mutating input record
  DANGEROUSLY_CHANGE_STORE_RECORD: "DANGEROUSLY_CHANGE_STORE_RECORD",

  // change a single record in the store without mutating input record
  // and makes a CRUD create call.
  //
  // This is needed because in the past, we relied on mutation to update
  // the input record to CHANGE, and then call the CREATE action with the
  // mutated record. However, in a world without mutations, we would have
  // to wait for a React re-render cycle to get the new value, which is
  // annoying. This makes that use case nicer.
  DANGEROUSLY_CHANGE_STORE_RECORD_AND_CREATE:
    "DANGEROUSLY_CHANGE_STORE_RECORD_AND_CREATE",

  // change a single record in the store without mutating input record
  // and makes  CRUD update call.
  //
  // This is needed because in the past, we relied on mutation to update
  // the input record to CHANGE, and then call the UPDATE action with the
  // mutated record. However, in a world without mutations, we would have
  // to wait for a React re-render cycle to get the new value, which is
  // annoying. This makes that use case nicer.
  DANGEROUSLY_CHANGE_STORE_RECORD_AND_UPDATE:
    "DANGEROUSLY_CHANGE_STORE_RECORD_AND_UPDATE",

  // mutate a single record in the store without making it dirty
  MUTATE: "MUTATE",

  // insert a record at the beginning of the store
  UNSHIFT: "UNSHIFT",

  // insert a record at the end of the store
  PUSH: "PUSH",

  // make a copy of a record and insert it in the store
  CLONE: "CLONE",

  // remove a record
  REMOVE: "REMOVE",

  // sort the store by supplied params
  SORT: "SORT",

  // meant for toggling a state of a record in the store
  TOGGLE: "TOGGLE",

  // Meant for selecting a single record in the store.
  // When a record is selected, the other records in the store should be unselected.
  // If you need to implement multiple selections, `TOGGLE` may be more suitable.
  SELECT: "SELECT",

  // Deprecated - prefer to use formState to build your forms
  // Undo all changes in a store
  UNDO: "UNDO",

  // Deprecated - prefer to use formState to build your forms
  // Undo all changes in a store without mutating the input record
  DANGEROUSLY_UNDO_STORE_RECORD: "DANGEROUSLY_UNDO_STORE_RECORD",

  // replace all records in a store with a new set
  RESET: "RESET",

  // merge a set of records with existing records in the store
  MERGE: "MERGE",

  // merge a single record into the store and make it selected
  MERGE_AND_SELECT: "MERGE_AND_SELECT",
};

export const EventTypes = {
  // common event type for all mutation
  CHANGED: "CHANGED",

  UNSHIFTED: "UNSHIFTED",
  PUSHED: "PUSHED",
  CLONED: "CLONED",
  REMOVED: "REMOVED",
  SORTED: "SORTED",
  TOGGLED: "TOGGLED",
  SELECTED: "SELECTED",
  UNDONE: "UNDONE",
  RESET: "RESET",
  MERGED: "MERGED",
};
