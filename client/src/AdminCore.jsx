// @flow
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import AppRoute from "./AppRoute";
import Page404 from "./Page404";
import EditPage from "./resource-page/Edit";
import IndexPage from "./resource-page/Index";
import NewPage from "./resource-page/New";
import ShowPage from "./resource-page/Show";
import type {
  ResourceField,
  ResourceFieldView,
  ResourceFilter,
  ResourceFilterView,
  ResourceManager,
  SidebarItem,
} from "./decls";

const resourceFields: { [string]: Class<ResourceFieldView>; } = {};
const resourceFilters: { [string]: Class<ResourceFilterView>; } = {};

export default class AdminCore extends React.Component {
  props: {
    sidebar: SidebarItem[];
    resourceManagers: ResourceManager[];
    children?: any;
    siteName: string;
  }

  static registerResourceField(name: string, view: Class<ResourceFieldView>) {
    resourceFields[name] = view;
  }

  static resolveResourceField(field: ResourceField) {
    const viewClass = resourceFields[field.type];
    return new viewClass(field);
  }

  static registerResourceFilter(name: string, view: Class<ResourceFilterView>) {
    resourceFilters[name] = view;
  }

  static resolveResourceFilter(filter: ResourceFilter) {
    const viewClass = resourceFilters[filter.type];
    return new viewClass(filter);
  }

  renderAppRoute(path: ?string, component: ReactClass<*>, key: string) {
    if (!path) return;
    return (
      <AppRoute
        sidebar={this.props.sidebar}
        siteName={this.props.siteName}
        resourceManagers={this.props.resourceManagers}
        exact
        path={path}
        component={component}
        key={key}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {this.props.children}
          {this.props.resourceManagers.map((resourceManager, i) => [
            this.renderAppRoute(resourceManager.indexPath, IndexPage(resourceManager), `index-${i}`),
            this.renderAppRoute(resourceManager.newPath, NewPage(resourceManager), `new-${i}`),
            this.renderAppRoute(resourceManager.showPath, ShowPage(resourceManager), `show-${i}`),
            this.renderAppRoute(resourceManager.editPath, EditPage(resourceManager), `edit-${i}`),
          ].filter(route => route))}
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

AdminCore.registerResourceField("belongs_to", require("./resource-field/BelongsTo").default);
AdminCore.registerResourceField("boolean", require("./resource-field/Boolean").default);
AdminCore.registerResourceField("date", require("./resource-field/Date").default);
AdminCore.registerResourceField("date_time", require("./resource-field/DateTime").default);
AdminCore.registerResourceField("enum", require("./resource-field/Enum").default);
AdminCore.registerResourceField("has_many", require("./resource-field/HasMany").default);
AdminCore.registerResourceField("number", require("./resource-field/Number").default);
AdminCore.registerResourceField("string", require("./resource-field/String").default);
AdminCore.registerResourceField("text", require("./resource-field/Text").default);

AdminCore.registerResourceFilter("boolean", require("./resource-filter/Boolean").default);
AdminCore.registerResourceFilter("number", require("./resource-filter/Number").default);
AdminCore.registerResourceFilter("string", require("./resource-filter/String").default);
