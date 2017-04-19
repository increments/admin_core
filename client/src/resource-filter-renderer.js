// @flow
import AdminCore from "./AdminCore";
import type {ResourceFilter} from "./decls";

export function renderFilter(filter: ResourceFilter, onChange: (string, string, any) => void) {
  const module = AdminCore.resolveResourceFilter(filter);
  return module.renderFilter(onChange);
}
