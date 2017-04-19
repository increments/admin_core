// @flow
import React from "react";
import type {ResourceFieldView, ResourceField$Enum} from "../decls";

export default class Enum implements ResourceFieldView {
  field: ResourceField$Enum;

  constructor(field: ResourceField$Enum) {
    this.field = field;
  }

  getValue() {
    return this.field.value.value;
  }

  renderIndex() {
    if (this.field.value.values.indexOf(this.field.value.value) !== -1 && typeof this.field.value.value === "number") {
      return <span>{this.field.value.values[this.field.value.value]}</span>;
    } else {
      return <span>{this.field.value.value}</span>;
    }
  }

  renderNew(onChange: (string, any) => void) {
    return this.renderInput(onChange);
  }

  renderShow() {
    return this.renderIndex();
  }

  renderEdit(onChange: (string, any) => void) {
    return this.renderInput(onChange);
  }

  renderInput(onChange: (string, any) => void) {
    return (
      <select
        className="form-control"
        defaultValue={this.field.value.value}
        onChange={(e: SyntheticEvent) => {
          const el = e.target;
          if (el instanceof HTMLSelectElement) {
            onChange(this.field.name, el.value);
          }
        }}
      >
        {this.field.value.values.map((value, i) =>
          <option value={value} key={i}>{value}</option>
        )}
      </select>
    );
  }
}
