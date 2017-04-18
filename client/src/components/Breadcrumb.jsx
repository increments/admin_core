// @flow
import React from "react";
import {Link} from "react-router-dom";

const Breadcrumb = ({ links, current }: { links: string[][]; current: ?string; }) => (
  <ol className="breadcrumb">
    {links.map(([text, path], i) =>
      <span className="breadcrumb-item" key={i}>
        <Link to={path}>{text}</Link>
      </span>
    )}
    <span className="breadcrumb-item">
      {current || "..."}
    </span>
  </ol>
);

export default Breadcrumb;
