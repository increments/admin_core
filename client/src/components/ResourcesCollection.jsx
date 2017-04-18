// @flow
import React from "react";
import {Link} from "react-router-dom";

import type {Resource} from "../decls";
import {renderIndex} from "../resource-field-renderer";

export default class ResourcesCollection extends React.Component {
  props: {
    attributes: string[];
    resources: Resource[];
  }

  render() {
    return (
      <table className="table table-bordered table-hover table-sm">
        <thead>
          <tr>
            {this.props.attributes.map((attribute, i) =>
              <th key={i}>{attribute}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.resources.map((resource, i) =>
            <tr key={i}>
              {resource.fields.map((field, j) => {
                const showPath = resource.showPath;
                if (j === 0 && showPath) {
                  return <td key={j}><Link to={showPath}>{renderIndex(field)}</Link></td>;
                } else {
                  return <td key={j}>{renderIndex(field)}</td>;
                }
              })}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
