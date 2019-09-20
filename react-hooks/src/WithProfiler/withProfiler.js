import React, { Profiler } from "react";

const withProfiler = profilerId => WrappedComponent => {
    class ProfilerComponent extends React.Component {
        async logMeasurement(id, phase, actualDuration, baseDuration) {
            console.log({ id, phase, actualDuration, baseDuration });
        }

        render() {
            return (
                <Profiler id={profilerId} onRender={this.logMeasurement}>
                    <WrappedComponent {...this.props} />
                </Profiler>
            );
        }
    }

    return ProfilerComponent;
};

export default withProfiler;
