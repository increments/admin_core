// @flow
import React from "react";
import {NavLink} from "react-router-dom";

import type {
  SidebarDropdown,
  SidebarItem,
  SidebarLink,
  SidebarTitle,
} from "../decls";

export default class Sidebar extends React.Component {
  props: {
    items: SidebarItem[];
  }

  handleClick(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target;
    if (target instanceof HTMLElement) {
      const parent = target.parentElement;
      if (parent) {
        parent.classList.toggle("open");
      }
    }
  }

  renderSidebarItem(item: SidebarItem, key: number) {
    if (item.type === 'title') {
      return this.renderSidebarTitle(item, key);
    } else if (item.type === 'link') {
      return this.renderSidebarLink(item, key);
    } else if (item.type === 'dropdown') {
      return this.renderSidebarDropdown(item, key);
    }
  }

  renderSidebarTitle(sidebarTitle: SidebarTitle, key: number) {
    return (
      <li className="nav-title" key={key}>
        {sidebarTitle.displayName}
      </li>
    );
  }

  renderSidebarDropdown(sidebarDropdown: SidebarDropdown, key: number) {
    return (
      <li className="nav-item nav-dropdown" key={key}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}>
          {sidebarDropdown.displayName}
        </a>
        <ul className="nav-dropdown-items">
          {sidebarDropdown.links.map((link, i) =>
            this.renderSidebarLink(link, i)
          )}
        </ul>
      </li>
    )
  }

  renderSidebarLink(link: SidebarLink, key: number) {
    return (
      <li className="nav-item" key={key}>
        {link.external ?
          <a href={link.link} className="nav-link">
            {link.displayName}
          </a>
        :
          <NavLink to={link.link} className="nav-link" activeClassName="active">
            {link.displayName}
          </NavLink>
        }
      </li>
    );
  }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            {this.props.items.map((item, i) =>
              this.renderSidebarItem(item, i)
            )}
          </ul>
        </nav>
      </div>
    );
  }
}
