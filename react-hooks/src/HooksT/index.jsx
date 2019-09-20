import React, { useState, useEffect } from "react";

const useBeacon = () => {
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        const sendBeacon = () => setRenderCount(renderCount + 1);
        if (renderCount < 10) {
            setTimeout(() => {
                sendBeacon();
            }, 1000);
        }
        console.log("vvvvvvv", renderCount);

        return () => {
            // cleanup
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderCount]);

    return <div>{renderCount}</div>;
};
export default useBeacon;
