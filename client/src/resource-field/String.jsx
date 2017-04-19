// @flow
import React from "react";
import type {ResourceFieldView, ResourceField$String} from "../decls";

export default class StringView implements ResourceFieldView {
  field: ResourceField$String;

  constructor(field: ResourceField$String) {
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
        type="text"
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
