// @flow
import React from "react";
import {Route} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import type {ResourceManager, SidebarItem} from "./decls";

export default class AppRoute extends React.Component {
  props: {
    sidebar: SidebarItem[];
    siteName: string;
    resourceManagers: ResourceManager[];

    component: ReactClass<*>;
    path: string;
    exact?: boolean;
    strict?: boolean;
  }

  render() {
    return (
      <Route
        path={this.props.path}
        exact={this.props.exact}
        strict={this.props.strict}
        render={(props: any) => (
          <div className="app">
            <Header siteName={this.props.siteName} />
            <div className="app-body">
              <Sidebar items={this.props.sidebar} />
              <this.props.component {...props} />
            </div>
          </div>
        )}
      />
    );
  }
}
