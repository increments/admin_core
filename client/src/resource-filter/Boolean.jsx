// @flow
import React from "react";
import type {ResourceFilterView, ResourceFilter$Boolean} from "../decls";

export default class BooleanView implements ResourceFilterView {
  filter: ResourceFilter$Boolean;

  constructor(filter: ResourceFilter$Boolean) {
    this.filter = filter;
  }

  renderFilter(onChange: (string, string, string) => void) {
    return (
      <select
        className="form-control"
        defaultValue={this.filter.query.value == null ? null : this.filter.query.value ? "true" : "false"}
        onChange={(e: SyntheticEvent) => {
          const el = e.target;
          if (el instanceof HTMLSelectElement) {
            onChange(this.filter.name, "is", el.value);
          }
        }}
      >
        <option>Any</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    );
  }
}
