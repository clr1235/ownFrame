import React from "react";
import ReactDOM from "react-dom";

import { Hello } from "./hello";
import registerServiceWorker from './sw'

registerServiceWorker()

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);



