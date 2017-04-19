// @flow
import React from "react";
import type {ResourceFilterView, ResourceFilter$Number} from "../decls";

class ResourceFilterNumber extends React.Component {
  props: {
    filter: ResourceFilter$Number;
    onChange: (string, string, string) => void;
  };

  handleChange() {
    this.props.onChange(
      this.props.filter.name,
      this.refs.select.value,
      this.refs.input.value
    );
  }

  render() {
    return (
      <div>
        <select
          ref="select"
          className="form-control"
          defaultValue={this.props.filter.query.operator}
          onChange={this.handleChange.bind(this)}
        >
          <option value="equals">Equals</option>
          <option value="greater_than">Greater than</option>
          <option value="less_than">Less than</option>
        </select>
        <input
          ref="input"
          className="form-control"
          defaultValue={this.props.filter.query.value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

export default class NumberView implements ResourceFilterView {
  filter: ResourceFilter$Number;

  constructor(filter: ResourceFilter$Number) {
    this.filter = filter;
  }

  renderFilter(onChange: (string, string, string) => void) {
    return <ResourceFilterNumber filter={this.filter} onChange={onChange} />;
  }
}
