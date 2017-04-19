// @flow
import React from "react";

import ResourcesCollection from "../components/ResourcesCollection";
import type {Resource, ResourceFieldView, $ResourceField} from "../decls";

type ResourceField$HasMany = $ResourceField<"has_many", { attributes: string[]; resources: Resource[]; }>;

export default class HasMany implements ResourceFieldView {
  field: ResourceField$HasMany;

  constructor(field: ResourceField$HasMany) {
    this.field = field;
  }

  getValue() {
    throw new Error("Not implemented");
  }

  renderIndex() {
    return (
      <ResourcesCollection
        attributes={this.field.value.attributes}
        resources={this.field.value.resources}
      />
    );
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
