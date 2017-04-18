// @flow
import React from "react";
import {Link} from "react-router-dom";
import type {Location} from "react-router-dom";
import {Card, CardBlock, CardHeader, CardFooter} from "reactstrap";

import type {ResourceFilter} from "../decls";
import {renderFilter} from "../resource-filter-renderer";

const REGEXP = /\Afilter\[[^]*]\]=/;

export default class ResourceFilters extends React.Component {
  props: {
    filters: ResourceFilter[];
    location: Location;
  };

  state: {
    [string]: { operator: string; value: string; };
  };

  constructor(props: any) {
    super(props);
    const state = {};
    this.props.filters.forEach(filter => {
      state[filter.name] = {
        operator: filter.query.operator,
        value: filter.query.value,
      };
    });
    this.state = state;
  }

  handleChange(name: string, operator: string, value: string) {
    const state = {};
    state[name] = { operator, value };
    this.setState(state);
  }

  renderApply() {
    const queries = this.props.location.search.substring(1).split("&").filter(kv => REGEXP.test(kv));
    Object.keys(this.state).forEach(name => {
      if (this.state[name].value) {
        queries.push(`filter[${name}:${this.state[name].operator}]=${this.state[name].value}`);
      }
    });
    const search = queries.join("&");
    return (
      <Link
        to={{
          pathname: this.props.location.pathname,
          search: search ? `?${search}` : "",
          hash: this.props.location.hash,
        }}
        className="btn btn-primary"
      >
        Apply
      </Link>
    );
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-filter"/>
          Filters
        </CardHeader>
        <CardBlock>
          {this.props.filters.map((filter, i) =>
            <div className="row" key={i}>
              <div className="col-md-3 col-lg-12">
                {filter.displayName}
              </div>
              <div className="col-md-9 col-lg-12">
                {renderFilter(filter, this.handleChange.bind(this))}
              </div>
            </div>
          )}
        </CardBlock>
        <CardFooter>
          {this.renderApply()}
        </CardFooter>
      </Card>
    );
  }
}
