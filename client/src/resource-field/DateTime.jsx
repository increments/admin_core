// @flow
import React from "react";
import type {ResourceField$DateTime} from "../decls";

exports.getValue = function (field: ResourceField$DateTime) {
  return field.value;
};

exports.Index = exports.Show = function (field: ResourceField$DateTime) {
  const date = new Date(field.value);
  return <span>{date.toLocaleString()}</span>;
};

exports.New = exports.Edit = function (field: ResourceField$DateTime, onChange: (string, any) => void) {
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
      type="datetime"
    />
  );
};
