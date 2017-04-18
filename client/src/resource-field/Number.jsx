// @flow
import React from "react";
import type {ResourceField$Number} from "../decls";

exports.getValue = function (field: ResourceField$Number) {
  return field.value;
};

exports.Index = exports.Show = function (field: ResourceField$Number) {
  return <span>{field.value}</span>;
};

exports.New = exports.Edit = function(field: ResourceField$Number, onChange: (string, any) => void) {
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
      type="number"
    />
  );
};
