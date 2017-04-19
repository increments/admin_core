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

type $ResourceField<T, V> = {
  displayName: string;
  name: string;
  type: T;
  value: V;
};

export type ResourceField = $ResourceField<*, *>;

export type ResourceField$Boolean = $ResourceField<"boolean", boolean>;
export type ResourceField$BelongsTo = $ResourceField<"belongs_to", { resource: Resource; }>;
export type ResourceField$Date = $ResourceField<"date", string>;
export type ResourceField$DateTime = $ResourceField<"date_time", string>;
export type ResourceField$Enum = $ResourceField<"enum", { value: string; values: string[]; }>;
export type ResourceField$Number = $ResourceField<"number", number>;
export type ResourceField$String = $ResourceField<"string", string>;
export type ResourceField$Text = $ResourceField<"text", string>;

export interface ResourceFieldView {
  field: ResourceField;
  constructor(ResourceField): void;
  getValue(): any;
  renderIndex(): React$Element<*>;
  renderNew(onChange: (string, any) => void): React$Element<*>;
  renderShow(): React$Element<*>;
  renderEdit(onChange: (string, any) => void): React$Element<*>;
}

type $ResourceFilter<O, V> = {
  type: string;
  name: string;
  displayName: string;
  query: {
    operator: O;
    value: ?V;
  };
}

export type ResourceFilter = $ResourceFilter<*, *>;

export type ResourceFilter$Boolean = $ResourceFilter<"is", boolean>;
export type ResourceFilter$Number = $ResourceFilter<"equals" | "greater_than" | "less_than", number>;
export type ResourceFilter$String = $ResourceFilter<"contains" | "equals" | "starts_with" | "ends_with", string>;

export interface ResourceFilterView {
  filter: ResourceFilter;
  constructor(ResourceFilter): void;
  renderFilter(onChange: (string, string, string) => void): React$Element<*>;
}

// Shape of AdminCore::ResourcePage::Index#to_json
export type ResourcePage$Index = {
  attributes: string[];
  resources: Resource[];
  filters: ResourceFilter[];
  scopes: { name: string; count: number; }[];
  pagination: {
    current: number;
    total: number;
  };
}

// Shape of AdminCore::ResourcePage::New#to_json
export type ResourcePage$New = {
  resource: Resource;
}

// Shape of AdminCore::ResourcePage::Show#to_json
export type ResourcePage$Show = {
  resource: Resource;
}

// Shape of AdminCore::ResourcePage::Edit#to_json
export type ResourcePage$Edit = {
  resource: Resource;
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
