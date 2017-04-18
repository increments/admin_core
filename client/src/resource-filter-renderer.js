// @flow
import type {ResourceFilter, ResourceFilterModule} from "./decls";

const resourceFilters: { [string]: ResourceFilterModule; } = {};

export function register(name: string, module: ResourceFilterModule) {
  resourceFilters[name] = module;
}

export function renderFilter(filter: ResourceFilter, onChange: (string, string, any) => void) {
  const module = resourceFilters[filter.type];
  return module.Filter(filter, onChange);
}

register("boolean", require("./resource-filter/Boolean"));
register("number", require("./resource-filter/Number"));
register("string", require("./resource-filter/String"));
