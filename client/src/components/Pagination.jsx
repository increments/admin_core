// @flow
import React from "react";
import {Link} from "react-router-dom";

export default class Pagination extends React.Component {
  props: {
    total: number;
    current: number;
    location: {
      pathname: string;
      search: string;
      hash: string;
    };
  }

  link(page: number) {
    const queries = this.props.location.search.substring(1).split("&")
      .filter(query => query && !query.startsWith("page="));
    return {
      pathname: this.props.location.pathname,
      search: `?${queries.concat([`page=${page}`]).join("&")}`,
      hash: this.props.location.hash,
    };
  }

  renderPrev() {
    return (
      this.props.current === 1 ?
        <li className="page-item disabled">
          <a className="page-link" href="#">‹</a>
        </li>
      :
        <li className="page-item">
          <Link to={this.link(this.props.current - 1)} className="page-link">‹</Link>
        </li>
    );
  }

  renderNext() {
    return (
      this.props.current === this.props.total ?
        <li className="page-item disabled">
          <a className="page-link" href="#">›</a>
        </li>
      :
        <li className="page-item">
          <Link to={this.link(this.props.total)} className="page-link">›</Link>
        </li>
    );
  }

  render() {
    const pages = [];
    for (let i = 1; i <= this.props.total; i++) { pages.push(i); }
    return (
      <ul className="pagination">
        {this.renderPrev()}
        { pages.map(page =>
          page === this.props.current ?
            <li className="page-item active" key={page}>
              <a className="page-link" href="#">{page}</a>
            </li>
          :
            <li className="page-item" key={page}>
              <Link to={this.link(page)} className="page-link">{page}</Link>
            </li>
        )}
        {this.renderNext()}
      </ul>
    );
  }
}
