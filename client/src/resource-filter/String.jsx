// @flow
import React from "react";
import type {ResourceFilter$String} from "../decls";

class ResourceFilterString extends React.Component {
  props: {
    filter: ResourceFilter$String;
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
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="starts_with">Starts with</option>
          <option value="ends_with">Ends with</option>
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

export function Filter(filter: ResourceFilter$String, onChange: (string, string, string) => void) {
  return <ResourceFilterString filter={filter} onChange={onChange} />;
}
