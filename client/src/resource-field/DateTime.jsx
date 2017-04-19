// @flow
import React from "react";
import type {ResourceFieldView, ResourceField$DateTime} from "../decls";

export default class DateTime implements ResourceFieldView {
  field: ResourceField$DateTime;

  constructor(field: ResourceField$DateTime) {
    this.field = field;
  }

  getValue() {
    return this.field.value;
  }

  renderIndex() {
    const date = new Date(this.field.value);
    return <span>{date.toLocaleString()}</span>;
  }

  renderNew(onChange: (string, any) => void) {
    return this.renderInput(onChange);
  }

  renderShow() {
    const date = new Date(this.field.value);
    return <span>{date.toLocaleString()}</span>;
  }

  renderEdit(onChange: (string, any) => void) {
    return this.renderInput(onChange);
  }

  renderInput(onChange: (string, any) => void) {
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
        type="date"
      />
    );
  }
}
