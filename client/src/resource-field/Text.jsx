// @flow
import React from "react";
import type {ResourceFieldView, $ResourceField} from "../decls";

type ResourceField$Text = $ResourceField<"text", string>;

export default class TextView implements ResourceFieldView {
  field: ResourceField$Text;

  constructor(field: ResourceField$Text) {
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
      <textarea
        className="form-control"
        defaultValue={this.field.value}
        name={this.field.name}
        onChange={(e: SyntheticEvent) => {
          const el = e.target;
          if (el instanceof HTMLTextAreaElement) {
            onChange(this.field.name, el.value);
          }
        }}
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
