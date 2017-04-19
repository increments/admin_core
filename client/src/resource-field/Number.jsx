// @flow
import React from "react";
import type {ResourceFieldView, ResourceField$Number} from "../decls";

export default class NumberView implements ResourceFieldView {
  field: ResourceField$Number;

  constructor(field: ResourceField$Number) {
    this.field = field;
  }

  getValue() {
    return this.field.value;
  }

  renderIndex() {
    return <span>{this.field.value}</span>;
  }

  renderNew(onChange: (string, any) => void) {
    return (
      <input
        className="form-control"
        defaultValue={this.field.value}
        name={this.field.name}
        onChange={(e: SyntheticEvent) => {
          const el = e.target;
          if (el instanceof HTMLInputElement) {
            onChange(this.field.name, el.value);
          }
        }}
        type="number"
      />
    );
  }

  renderShow() {
    return this.renderIndex();
  }

  renderEdit(onChange: (string, any) => void) {
    return this.renderNew(onChange);
  }
}
