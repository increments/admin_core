// @flow
import React from "react";
import type {ResourceFilter$Boolean} from "../decls";

export function Filter(filter: ResourceFilter$Boolean, onChange: (string, string, string) => void) {
  return (
    <select
      className="form-control"
      defaultValue={filter.query.value == null ? null : filter.query.value ? "true" : "false"}
      onChange={(e: SyntheticEvent) => {
        const el = e.target;
        if (el instanceof HTMLSelectElement) {
          onChange(filter.name, "is", el.value);
        }
      }}
    >
      <option>Any</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  );
}
