// @flow
import React from "react";
import type {ResourceField$Text} from "../decls";

exports.getValue = function (field: ResourceField$Text) {
  return field.value;
};

exports.Index = exports.Show = function (field: ResourceField$Text) {
  return <span>{field.value}</span>;
};

exports.New = exports.Edit = function(field: ResourceField$Text, onChange: (string, any) => void) {
  return (
    <textarea
      className="form-control"
      defaultValue={field.value}
      name={field.name}
      onChange={(e: SyntheticEvent) => {
        const el = e.target;
        if (el instanceof HTMLTextAreaElement) {
          onChange(field.name, el.value);
        }
      }}
    />
  );
};
