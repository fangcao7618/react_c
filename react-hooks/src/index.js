// import React, { Profiler } from "react";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App/App";
// import Hooks from "./Hooks/Hooks";
// import Hooks from "./HooksT";
// import Hooks from "./MoreHooks/indexyouhua";
// import ZuheJiCheng from "./zuhejicheng";
// import SVG from "./SVG";
import Home from "./Index/index";
import * as serviceWorker from "./serviceWorker";

// async function profilerCallback(
//     id,
//     phase,
//     actualTime,
//     baseTime,
//     startTime,
//     commitTime
// ) {
//     console.log(`${id}'s ${phase} phase:`);
//     console.log(`Actual time: ${actualTime}`);
//     console.log(`Base time: ${baseTime}`);
//     console.log(`Start time: ${startTime}`);
//     console.log(`Commit time: ${commitTime}`);
// }
// ReactDOM.render(
//     <Profiler id="ZuheJiCheng" onRender={profilerCallback}>
//         <ZuheJiCheng />
//     </Profiler>,
//     document.getElementById("root")
// );

ReactDOM.render(<Home />, document.getElementById("root"));

serviceWorker.unregister();
