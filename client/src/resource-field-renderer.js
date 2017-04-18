// @flow
import type {
  ResourceFieldModule,
  ResourceField,
} from "./decls";

const resourceFields: { [string]: ResourceFieldModule; } = {};

export function register(name: string, module: ResourceFieldModule) {
  resourceFields[name] = module;
}

export function getValue(field: ResourceField) {
  const module = resourceFields[field.type];
  return module.getValue(field);
}

export function renderIndex(field: ResourceField) {
  const module = resourceFields[field.type];
  return module.Index(field);
}

export function renderNew(field: ResourceField, onChange: (string, any) => void) {
  const module = resourceFields[field.type];
  return module.New(field, onChange);
}

export function renderShow(field: ResourceField) {
  const module = resourceFields[field.type];
  return module.Show(field);
}

export function renderEdit(field: ResourceField, onChange: (string, any) => void) {
  const module = resourceFields[field.type];
  return module.Edit(field, onChange);
}

register("belongs_to", require("./resource-field/BelongsTo"));
register("boolean", require("./resource-field/Boolean"));
register("date", require("./resource-field/Date"));
register("date_time", require("./resource-field/DateTime"));
register("enum", require("./resource-field/Enum"));
register("number", require("./resource-field/Number"));
register("string", require("./resource-field/String"));
register("text", require("./resource-field/Text"));
