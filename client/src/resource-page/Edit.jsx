// @flow
import React from "react";

import Base from "./Base";
import ResourceForm from "../components/ResourceForm";
import Breadcrumb from "../components/Breadcrumb";
import type {Resource, ResourceManager} from "../decls";

// Shape of AdminCore::ResourcePage::Edit#to_json
type ResourcePage$Edit = {
  resource: Resource;
}

export default function editPage(resourceManager: ResourceManager) {
  class EditPage extends Base {
    state: {
      page?: ResourcePage$Edit;
    }

    render() {
      const page = this.state.page;
      return (
        <main className="main">
          <Breadcrumb links={[["Home", "/"], [resourceManager.displayName, resourceManager.indexPath], page ? [page.resource.displayName, page.resource.showPath || "#"] : ["...", "#"]]} current="Edit"/>
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
                          action={page.resource.showPath || ""}
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
  EditPage.displayName = `EditPage(${resourceManager.displayName})`;
  return EditPage;
}
