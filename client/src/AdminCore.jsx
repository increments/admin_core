// @flow
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import EditPage from "./resource-page/edit";
import Header from "./components/header";
import IndexPage from "./resource-page/index";
import NewPage from "./resource-page/new";
import ShowPage from "./resource-page/show";
import Sidebar from "./components/sidebar";
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

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header siteName={this.props.siteName} />
          <div className="app-body">
            <Sidebar items={this.props.sidebar} />
            <Switch>
              {this.props.children}
              {this.props.resourceManagers.map((resourceManager, i) => [
                <Route exact path={resourceManager.indexPath} component={IndexPage(resourceManager)} key={`index-${i}`} />,
                resourceManager.newPath && <Route exact path={resourceManager.newPath} component={NewPage(resourceManager)} key={`new-${i}`} />,
                <Route exact path={resourceManager.showPath} component={ShowPage(resourceManager)} key={`show-${i}`} />,
                resourceManager.editPath && <Route exact path={resourceManager.editPath} component={EditPage(resourceManager)} key={`edit-${i}`} />,
              ].filter(route => route))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

AdminCore.registerResourceField("belongs_to", require("./resource-field/BelongsTo").default);
AdminCore.registerResourceField("boolean", require("./resource-field/Boolean").default);
AdminCore.registerResourceField("date", require("./resource-field/Date").default);
AdminCore.registerResourceField("date_time", require("./resource-field/DateTime").default);
AdminCore.registerResourceField("enum", require("./resource-field/Enum").default);
AdminCore.registerResourceField("number", require("./resource-field/Number").default);
AdminCore.registerResourceField("string", require("./resource-field/String").default);
AdminCore.registerResourceField("text", require("./resource-field/Text").default);

AdminCore.registerResourceFilter("boolean", require("./resource-filter/Boolean").default);
AdminCore.registerResourceFilter("number", require("./resource-filter/Number").default);
AdminCore.registerResourceFilter("string", require("./resource-filter/String").default);
