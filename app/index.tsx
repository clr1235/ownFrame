import React from "react";
import ReactDOM from "react-dom";

import { configure } from 'mobx';

import registerServiceWorker from './sw'

import App from "./app";

configure({
  enforceActions: "observed"
});

registerServiceWorker()

ReactDOM.render(
    <App />,
    document.getElementById("root")
);



