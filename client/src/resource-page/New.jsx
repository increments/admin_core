// @flow
import React from "react";

import Base from "./Base";
import ResourceForm from "../components/ResourceForm";
import Breadcrumb from "../components/Breadcrumb";
import type {Resource, ResourceManager} from "../decls";

// Shape of AdminCore::ResourcePage::New#to_json
type ResourcePage$New = {
  resource: Resource;
}

export default function newPage(resourceManager: ResourceManager) {
  class NewPage extends Base {
    state: {
      page?: ResourcePage$New;
    }

    render() {
      const page = this.state.page;
      return (
        <main className="main">
          <Breadcrumb links={[["Home", "/"], [resourceManager.displayName, resourceManager.indexPath]]} current="New" />
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                {page &&
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-block">
                        <h3 className="card-title">
                          New
                        </h3>
                        <ResourceForm
                          action={resourceManager.indexPath}
                          history={this.props.history}
                          resource={page.resource}
                        />
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </main>
      );
    }
  }
  NewPage.displayName = `NewPage(${resourceManager.displayName})`;
  return NewPage;
}
