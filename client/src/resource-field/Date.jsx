// @flow
import React from "react";
import type {ResourceField$Date} from "../decls";

exports.getValue = function (field: ResourceField$Date) {
  return field.value;
};

exports.Index = exports.Show = function (field: ResourceField$Date) {
  const date = new Date(field.value);
  return <span>{date.toLocaleDateString()}</span>;
};

exports.New = exports.Edit = function (field: ResourceField$Date, onChange: (string, any) => void) {
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
      type="date"
    />
  );
};
