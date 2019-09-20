import React from "react";
import "./index.css";

//写react loading 加载圆圈 https://github.com/fangcao7618/react-circle

const index = () => {
    const move_style = { cursor: "col-resize" };
    const newad = require("./circle1.svg");
    return (
        <React.Fragment>
            <div id="alert-icon"></div>
            <svg
                style={{ fill: "#f00" }}
                dangerouslySetInnerHTML={{ __html: newad }}
            />
            <svg className="load" viewBox="25 25 50 50">
                <circle
                    className="loading"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                />
            </svg>
            <div id="circle_container">
                <svg height="200" width="200">
                    <circle
                        cx="100"
                        cy="100"
                        r="50"
                        stroke="black"
                        strokeWidth="30"
                        fill="red"
                    />
                </svg>
            </div>
            <svg id="svg2" width="100%" height="620" style={move_style}>
                <circle
                    style={move_style}
                    id="circle1"
                    cx="300"
                    cy="200"
                    r="100"
                    stroke="black"
                    strokeWidth="1"
                    fill="#EED5D2"
                />
            </svg>
        </React.Fragment>
    );
};

export default index;
