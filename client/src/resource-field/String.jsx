// @flow
import React from "react";
import type {ResourceField$String} from "../decls";

exports.getValue = function (field: ResourceField$String) {
  return field.value;
};

exports.Index = exports.Show = function (field: ResourceField$String) {
  return <span>{field.value}</span>;
};

exports.New = exports.Edit = function(field: ResourceField$String, onChange: (string, any) => void) {
  return (
    <input
      className="form-control"
      defaultValue={field.value}
      name={field.name}
      onChange={(e: SyntheticEvent) => {
        const el = e.target;
        if (el instanceof HTMLInputElement) {
          onChange(field.name, el.value);
        }
      }}
      type="text"
    />
  );
};
