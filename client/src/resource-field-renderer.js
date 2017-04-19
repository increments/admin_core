// @flow
import AdminCore from "./AdminCore";
import type {ResourceField} from "./decls";

export function getValue(field: ResourceField) {
  const module = AdminCore.resolveResourceField(field);
  return module.getValue(field);
}

export function renderIndex(field: ResourceField) {
  const module = AdminCore.resolveResourceField(field);
  return module.renderIndex();
}

export function renderNew(field: ResourceField, onChange: (string, any) => void) {
  const module = AdminCore.resolveResourceField(field);
  return module.renderNew(onChange);
}

export function renderShow(field: ResourceField) {
  const module = AdminCore.resolveResourceField(field);
  return module.renderShow();
}

export function renderEdit(field: ResourceField, onChange: (string, any) => void) {
  const module = AdminCore.resolveResourceField(field);
  return module.renderEdit(onChange);
}
