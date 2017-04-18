// @flow
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import EditPage from "./resource-page/edit";
import Header from "./components/header";
import IndexPage from "./resource-page/index";
import NewPage from "./resource-page/new";
import ShowPage from "./resource-page/show";
import Sidebar from "./components/sidebar";
import type {ResourceManager, SidebarItem} from "./decls";

export default class App extends React.Component {
  props: {
    sidebar: SidebarItem[];
    resourceManagers: ResourceManager[];
    children?: any;
    siteName: string;
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

App.displayName = "AdminCore";
