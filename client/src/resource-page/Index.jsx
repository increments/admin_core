// @flow
import React from "react";
import classNames from "classnames";
import omit from "lodash.omit";
import reduce from "lodash.reduce";
import toPairs from "lodash.topairs";
import {Link} from "react-router-dom";
import {ButtonGroup, Card, CardBlock, CardHeader, CardTitle} from "reactstrap";

import Base from "./Base";
import Breadcrumb from "../components/Breadcrumb";
import ResourceFilters from "../components/ResourceFilters";
import ResourcesCollection from "../components/ResourcesCollection";
import Pagination from "../components/Pagination";
import type {ResourceManager, ResourceFilter, Resource} from "../decls";

// Shape of AdminCore::ResourcePage::Index#to_json
type ResourcePage$Index = {
  attributes: string[];
  resources: Resource[];
  filters: ResourceFilter[];
  scopes: { name: string; count: number; }[];
  pagination: {
    current: number;
    total: number;
  };
}

export default function index(resourceManager: ResourceManager) {
  class IndexPage extends Base {
    queries: { [string]: string; };

    state: {
      page?: ResourcePage$Index;
    }

    componentDidMount(...args: any) {
      super.componentDidMount(...args);
      this.setQueries();
    }

    componentDidUpdate(...args: any) {
      super.componentDidUpdate(...args);
      this.setQueries();
    }

    setQueries() {
      this.queries = reduce(this.props.location.search.substring(1).split("&"), (acc, kv) => {
        const [key, value] = kv.split("=");
        if (key) {
          acc[key] = value;
        }
        return acc;
      }, {});
    }

    renderScopeButton(scope: { name: string; count: number; }, key: number) {
      const match = scope.name === this.queries.scope;
      const search = reduce(toPairs(omit(this.queries, "scope")), (acc, kv) => {
        acc.push(kv.join("="));
        return acc;
      }, match ? [] : [`scope=${scope.name}`]).join("&");
      return (
        <Link
          to={{
            pathname: this.props.location.pathname,
            search: search ? `?${search}` : "",
            hash: this.props.location.hash,
          }}
          className={classNames("btn", { "btn-primary": match, "btn-secondary": !match })}
          key={key}
        >
          {scope.name} ({scope.count})
        </Link>
      );
    }

    needFilter() {
      const page = this.state.page;
      return page && (page.scopes.length > 0 || page.filters.length > 0);
    }

    render() {
      const page = this.state.page;
      return (
        <main className="main">
          <Breadcrumb links={[["Home", "/"]]} current={resourceManager.displayName}/>
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                {this.needFilter() &&
                  <div className="col-sm-12 col-lg-3 push-lg-9">
                    {page && page.scopes.length > 0 &&
                      <Card>
                        <CardHeader>
                          Scopes
                        </CardHeader>
                        <CardBlock>
                          <ButtonGroup vertical className="hidden-md-down d-block">
                            {page.scopes.map((scope, i) =>
                              this.renderScopeButton(scope, i)
                            )}
                          </ButtonGroup>
                          <ButtonGroup className="hidden-lg-up">
                            {page.scopes.map((scope, i) =>
                              this.renderScopeButton(scope, i)
                            )}
                          </ButtonGroup>
                        </CardBlock>
                      </Card>
                    }
                    {page && page.filters.length > 0 &&
                      <ResourceFilters location={this.props.location} filters={page.filters} />
                    }
                  </div>
                }
                { page &&
                  <div className={classNames("col-sm-12", { "col-lg-9 pull-lg-3": this.needFilter() })}>
                    <Card>
                      <CardBlock>
                        <div className="row">
                          <div className="col-sm-5">
                            <CardTitle>{resourceManager.displayName}</CardTitle>
                          </div>
                          <div className="col-sm-7">
                            {resourceManager.newPath &&
                              <Link to={resourceManager.newPath} className="btn btn-primary float-right">
                                <i className="icon-plus" />
                              </Link>
                            }
                          </div>
                        </div>
                        <ResourcesCollection {...page} />
                        {page.pagination.total > 1 &&
                          <Pagination
                            {...page.pagination}
                            location={this.props.location}
                          />
                        }
                      </CardBlock>
                    </Card>
                  </div>
                }
              </div>
            </div>
          </div>
        </main>
      );
    }
  }
  IndexPage.displayName = `IndexPage(${resourceManager.displayName})`;
  return IndexPage;
}
