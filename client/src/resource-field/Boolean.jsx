// @flow
import React from "react";
import type {ResourceFieldView, ResourceField$Boolean} from "../decls";

export default class BooleanView implements ResourceFieldView {
  field: ResourceField$Boolean;

  constructor(field: ResourceField$Boolean) {
    this.field = field;
  }

  getValue() {
    return this.field.value;
  }

  renderIndex() {
    return this.renderSwitch();
  }

  renderNew(onChange: (string, any) => void) {
    return this.renderInput(onChange);
  }

  renderShow() {
    return this.renderSwitch();
  }

  renderEdit(onChange: (string, any) => void) {
    return this.renderInput(onChange);
  }

  renderSwitch() {
    return (
      <span className="switch switch-text switch-primary">
        <input
          checked={this.field.value}
          className="switch-input"
          disabled={true}
          type="checkbox"
        />
        <span className="switch-label" data-on="On" data-off="Off"/>
        <span className="switch-handle"/>
      </span>
    );
  }

  renderInput(onChange: (string, any) => void) {
    return (
      <label className="switch switch-text switch-primary">
        <input
          type="checkbox"
          name={this.field.name}
          className="switch-input"
          defaultChecked={this.field.value}
          onChange={(e: SyntheticEvent) => {
            const el = e.target;
            if (el instanceof HTMLInputElement) {
              onChange(this.field.name, el.checked);
            }
          }}
        />
        <span className="switch-label" data-on="On" data-off="Off"/>
        <span className="switch-handle"/>
      </label>
    );
  }
}
