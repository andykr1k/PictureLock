import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/robot.json";

class RobotAnimation extends React.Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={120} width={120} />
      </div>
    );
  }
}

export default RobotAnimation;
