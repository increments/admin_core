// @flow
import axios from "axios";

const httpClient = axios.create({
  headers: {
    "Accept": "application/json",
  },
});

httpClient.interceptors.request.use(config => {
  const csrfToken = document.querySelector("meta[name='csrf-token']");
  if (csrfToken instanceof HTMLMetaElement && config.headers) {
    config.headers["X-CSRF-Token"] = csrfToken.content;
  }
  return config;
});

export default httpClient;
