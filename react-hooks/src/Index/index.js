import React from "react";
// import PropTypes from "prop-types";
import {
    MorphIcon,
    CloseButton,
    NavButton,
    PlusButton
} from "react-svg-buttons";

import SVG from "../SVG";
import Button from "../Button";
import WithProfiler from "../WithProfiler/withProfiler";

const Demo = () => (
    <div>
        <MorphIcon type="thunderbolt" />
        <CloseButton />
        <NavButton direction="right" opened={false} />
        <PlusButton />
    </div>
);

function Index(props) {
    const SVGDom = WithProfiler("id_svg")(SVG);
    const DemoBtn = WithProfiler("id_btn")(Demo);
    const ButtonDom = WithProfiler("id_button")(Button);
    return (
        <div>
            <ButtonDom></ButtonDom>
            <SVGDom></SVGDom>
            <DemoBtn></DemoBtn>
        </div>
    );
}

Index.propTypes = {};

export default Index;
