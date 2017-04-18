// @flow
import React from "react";
import classNames from "classnames";
import {Redirect} from "react-router-dom";
import type {RouterHistory} from "react-router-dom";

import httpClient from "../http-client";
import type {Resource, ResourceField} from "../decls";
import {getValue, renderNew, renderEdit} from "../resource-field-renderer";

export default class ResourceForm extends React.Component {
  props: {
    action: string;
    resource: Resource;
    history: RouterHistory;
  };

  state: {
    redirectTo?: string;
    errors: {
      [string]: string[];
    };
    values: {
      [string]: any;
    };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      errors: {},
      values: {},
    };
    props.resource.fields.forEach(field => {
      this.state.values[field.name] = getValue(field);
    });
  }

  request(data: any) {
    return this.props.resource.showPath ? httpClient.put(this.props.action, data) : httpClient.post(this.props.action, data);
  }

  handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const data = {};
    data[this.props.resource.name] = this.state.values;
    this.request(data)
      .then(r => this.setState({ redirectTo: r.data.redirectTo }))
      .catch(e => this.setState({ errors: e.response.data.errors }));
  }

  handleChange(name: string, value: any) {
    const values = this.state.values;
    values[name] = value;
    this.setState({ values });
  }

  handleClickCancel() {
    this.props.history.goBack();
  }

  shouldComponentUpdate(_: any, prevState: $PropertyType<ResourceForm, "state">) {
    return this.state.errors !== prevState.errors ||
      this.state.redirectTo !== prevState.redirectTo;
  }

  renderField(field: ResourceField) {
    const renderer = this.props.resource.showPath ? renderEdit : renderNew;
    return renderer(field, this.handleChange.bind(this));
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
        {this.props.resource.fields.map((field, i) =>
          <div
            className={classNames("form-group", "row", { "has-danger": this.state.errors[field.name] })}
            key={i}
          >
            <label className="col-md-3 form-control-label" htmlFor={field.name}>
              {field.displayName}
            </label>
            <div className="col-md-9">
              {this.renderField(field)}
              {this.state.errors[field.name] && this.state.errors[field.name].map((error, i) =>
                <div className="form-control-feedback" key={i}>
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
        <span className="btn btn-secondary" onClick={this.handleClickCancel.bind(this)}>
          Cancel
        </span>
      </form>
    );
  }
}
