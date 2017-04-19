// @flow
import React from "react";
import {Link} from "react-router-dom";

import type {ResourceFieldView, ResourceField$BelongsTo} from "../decls";
import {getValue} from "../resource-field-renderer";

export default class BelongsTo implements ResourceFieldView {
  field: ResourceField$BelongsTo;

  constructor(field: ResourceField$BelongsTo) {
    this.field = field;
  }

  getValue() {
    const fi = this.field.value.resource.fields.find(f => f.name === this.field.value.paramName);
    if (fi) {
      return getValue(fi);
    }
  }

  renderIndex() {
    const resource = this.field.value.resource;
    if (resource.showPath) {
      return <Link to={resource.showPath}>{resource.displayName}</Link>;
    } else {
      return <span>{resource.displayName}</span>;
    }
  }

  renderNew(_onChange: (string, any) => void) {
    throw new Error("Not implemented");
  }

  renderShow() {
    return this.renderIndex();
  }

  renderEdit(onChange: (string, any) => void) {
    return this.renderNew(onChange);
  }
}
