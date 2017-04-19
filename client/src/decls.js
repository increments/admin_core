// @flow

// Represent a single ActiveRecord::Base
export type Resource = {
  displayName: string;
  name: string;
  showPath: ?string; // If it is null, the resource is not persisted.
  editPath: ?string; // If it is null, the resource is not updatable.
  destroyable: boolean;
  fields: ResourceField[];
}

// Represent a child class of AdminCore::BaseResourceManager.
//
// @see AdminCore::BaseResourceManager.to_hash
export type ResourceManager = {
  displayName: string;
  indexPath: string;
  newPath: ?string; // If it is null, the resource is not creatable.
  showPath: string;
  editPath: ?string; // If it is null, the resource is not updatable.
  scopes: string[];
}

export type $ResourceField<T, V> = {
  displayName: string;
  name: string;
  type: T;
  value: V;
};

export type ResourceField = $ResourceField<*, *>;

export interface ResourceFieldView {
  field: ResourceField;
  constructor(ResourceField): void;
  getValue(): any;
  renderIndex(): React$Element<*>;
  renderNew(onChange: (string, any) => void): React$Element<*>;
  renderShow(): React$Element<*>;
  renderEdit(onChange: (string, any) => void): React$Element<*>;
}

export type $ResourceFilter<O, V> = {
  type: string;
  name: string;
  displayName: string;
  query: {
    operator: O;
    value: ?V;
  };
}

export type ResourceFilter = $ResourceFilter<*, *>;

export interface ResourceFilterView {
  filter: ResourceFilter;
  constructor(ResourceFilter): void;
  renderFilter(onChange: (string, string, string) => void): React$Element<*>;
}

export type SidebarItem = SidebarTitle | SidebarDropdown | SidebarLink;

export type SidebarTitle = {
  type: "title";
  displayName: string;
}

export type SidebarDropdown = {
  type: "dropdown";
  displayName: string;
  links: SidebarLink[];
}

export type SidebarLink = {
  type: "link";
  displayName: string;
  link: string;
  external: boolean;
};
