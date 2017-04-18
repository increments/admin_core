// @flow
import React from "react";
import type {ResourceField$Boolean} from "../decls";

exports.getValue = function (field: ResourceField$Boolean) {
  return field.value;
};

exports.Index = exports.Show = function (field: ResourceField$Boolean) {
  return (
    <span className="switch switch-text switch-primary">
      <input
        checked={field.value}
        className="switch-input"
        disabled={true}
        type="checkbox"
      />
      <span className="switch-label" data-on="On" data-off="Off"/>
      <span className="switch-handle"/>
    </span>
  );
};

exports.New = exports.Edit = function (field: ResourceField$Boolean, onChange: (string, any) => void) {
  return (
    <label className="switch switch-text switch-primary">
      <input
        type="checkbox"
        name={field.name}
        className="switch-input"
        defaultChecked={field.value}
        onChange={(e: SyntheticEvent) => {
          const el = e.target;
          if (el instanceof HTMLInputElement) {
            onChange(field.name, el.checked);
          }
        }}
      />
      <span className="switch-label" data-on="On" data-off="Off"/>
      <span className="switch-handle"/>
    </label>
  );
};
