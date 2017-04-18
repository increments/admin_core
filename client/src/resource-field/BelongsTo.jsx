// @flow
import React from "react";
import {Link} from "react-router-dom";

import type {ResourceField$BelongsTo} from "../decls";
import {getValue} from "../resource-field-renderer";

exports.getValue = function (field: ResourceField$BelongsTo) {
  const fi = field.value.resource.fields.find(f => f.name === field.value.paramName);
  if (fi) {
    return getValue(fi);
  }
};

exports.Index = exports.Show = function (field: ResourceField$BelongsTo) {
  const resource = field.value.resource;
  if (resource.showPath) {
    return <Link to={resource.showPath}>{resource.displayName}</Link>;
  } else {
    return <span>{resource.displayName}</span>;
  }
};

exports.New = exports.Edit = function(_field: ResourceField$BelongsTo, _onChange: (string, any) => void) {
  throw new Error("Not implemented");
};
