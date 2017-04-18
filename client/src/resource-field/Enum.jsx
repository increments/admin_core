// @flow
import React from "react";
import type {ResourceField$Enum} from "../decls";

exports.getValue = function (field: ResourceField$Enum) {
  return field.value.value;
};

exports.Index = exports.Show = function (field: ResourceField$Enum) {
  if (field.value.values.indexOf(field.value.value) !== -1 && typeof field.value.value === "number") {
    return <span>{field.value.values[field.value.value]}</span>;
  } else {
    return <span>{field.value.value}</span>;
  }
};

exports.New = exports.Edit = function (field: ResourceField$Enum, onChange: (string, any) => void) {
  return (
    <select
      className="form-control"
      defaultValue={field.value.value}
      onChange={(e: SyntheticEvent) => {
        const el = e.target;
        if (el instanceof HTMLSelectElement) {
          onChange(field.name, el.value);
        }
      }}
    >
      {field.value.values.map((value, i) =>
        <option value={value} key={i}>{value}</option>
      )}
    </select>
  );
};
