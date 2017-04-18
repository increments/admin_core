// @flow
import React from "react";
import {Link} from "react-router-dom";

export default class Header extends React.Component {
  props: {
    siteName: string;
  }

  sidebarToggle(e: SyntheticEvent) {
    e.preventDefault();
    this.toggle("sidebar-hidden");
  }

  mobileSidebarToggle(e: SyntheticEvent) {
    e.preventDefault();
    this.toggle("sidebar-mobile-show");
  }

  asideToggle(e: SyntheticEvent) {
    e.preventDefault();
    this.toggle("aside-menu-hidden");
  }

  toggle(name: string) {
    const body = document.body;
    if (body) {
      body.classList.toggle(name);
    }
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" onClick={this.mobileSidebarToggle.bind(this)} type="button">&#9776;</button>
        <Link to="/" className="navbar-brand">{this.props.siteName}</Link>
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle.bind(this)} href="#">&#9776;</a>
          </li>
        </ul>
      </header>
    );
  }
}
