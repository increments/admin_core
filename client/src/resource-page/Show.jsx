// @flow
import React from "react";
import {Link, Redirect} from "react-router-dom";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import httpClient from "../http-client";
import Base from "./Base";
import Breadcrumb from "../components/Breadcrumb";
import type {ResourceManager, ResourcePage$Show} from "../decls";
import {renderShow} from "../resource-field-renderer";

export default function show(resourceManager: ResourceManager) {
  class ShowPage extends Base {
    state: {
      confirm?: boolean;
      page?: ResourcePage$Show;
      redirectTo?: string;
    }

    toggleModal(e: SyntheticEvent) {
      e.preventDefault();
      this.setState({ confirm: !this.state.confirm });
    }

    deleteResource(e: SyntheticEvent) {
      e.preventDefault();
      const page = this.state.page;
      if (page && page.resource.showPath) {
        httpClient.delete(page.resource.showPath)
          .then(r => this.setState({ redirectTo: r.data.redirectTo }));
      }
    }

    renderPage(page: ResourcePage$Show) {
      const resource = page.resource;
      return (
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
              <div className="row">
                <div className="col-sm-5">
                  <h3 className="card-title">
                    {resource.displayName}
                  </h3>
                </div>
                <div className="col-sm-7">
                  {resource.destroyable && [
                    <a
                      href="#"
                      className="btn btn-outline-danger float-right"
                      onClick={this.toggleModal.bind(this)}
                      key="link"
                    >
                      <i className="icon-trash" />
                    </a>,
                    <Modal
                      isOpen={this.state.confirm}
                      toggle={this.toggleModal.bind(this)}
                      className="modal-danger"
                      key="modal"
                    >
                      <ModalHeader toggle={this.toggleModal.bind(this)}></ModalHeader>
                      <ModalBody>Are you sure?</ModalBody>
                      <ModalFooter>
                        <button className="btn btn-danger" onClick={this.deleteResource.bind(this)}>Delete</button>
                        <button className="btn btn-secondary" onClick={this.toggleModal.bind(this)}>Cancel</button>
                      </ModalFooter>
                    </Modal>
                  ]}
                  {resource.editPath &&
                    <Link to={resource.editPath} className="btn btn-outline-primary float-right mr-1">
                      <i className="icon-pencil" />
                    </Link>
                  }
                </div>
              </div>
              {resource.fields.map((field, i) =>
                <div className="row" key={i}>
                  <div className="col-md-3">
                    <strong>
                      {field.displayName}
                    </strong>
                  </div>
                  <div className="col-md-9">
                    {renderShow(field)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    render() {
      if (this.state.redirectTo) {
        return <Redirect to={this.state.redirectTo} />;
      }
      const page = this.state.page;
      return (
        <main className="main">
          <Breadcrumb links={[["Home", "/"], [resourceManager.displayName, resourceManager.indexPath]]} current={page && page.resource.displayName}/>
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                {page && this.renderPage(page)}
              </div>
            </div>
          </div>
        </main>
      );
    }
  }
  ShowPage.displayName = `ShowPage(${resourceManager.displayName})`;
  return ShowPage;
}
