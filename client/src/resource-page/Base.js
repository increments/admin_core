// @flow
import React from "react";
import type {Location, RouterHistory} from "react-router-dom";

import httpClient from "../http-client";

export default class Base extends React.Component {
  props: {
    location: Location;
    history: RouterHistory;
  };

  state: any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps: { location: Location; }) {
    if (this.props.location.pathname !== prevProps.location.pathname ||
        this.props.location.search !== prevProps.location.search) {
      this.loadPage();
    }
  }

  loadPage() {
    const jsonPathname = this.props.location.pathname.replace(/\.[^/.]+$/, "") + ".json";
    httpClient.get(jsonPathname + this.props.location.search)
      .then(({ data }) => this.setState({ page: data.page }));
  }
}
