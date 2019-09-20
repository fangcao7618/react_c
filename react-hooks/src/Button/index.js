import React from "react";
import "./index.css";

const PressedEffect = () => {
    return (
        <div>
            <h2>Animated Buttons - "Pressed Effect"</h2>
            <button className="button">Click Me</button>
        </div>
    );
};

const HoverAnimation = () => {
    return (
        <div>
            <h2>Animated Button</h2>

            <button className="abutton">
                <span>Hover </span>
            </button>
        </div>
    );
};

const ClickA = () => {
    return (
        <div>
            <h2>Animated Button - Ripple Effect</h2>

            <button className="cbutton">Click Me</button>
        </div>
    );
};

const Button = () => {
    return (
        <React.Fragment>
            <PressedEffect></PressedEffect>
            <HoverAnimation></HoverAnimation>
            <ClickA></ClickA>
        </React.Fragment>
    );
};

export default Button;
