import { Dimensions, View, ViewStyle } from "react-native";

import React from "react";

const MobileModeIfDesktop = props => {
  const { width } = Dimensions.get("window");
  const { children } = props;

  let mobileStyle: ViewStyle;
  if (width > 768) {
    const mobileStyle = {
      width: 375,
      height: 667,
      alignSelf: "center",
      marginTop: 20,
      position: "relative",
      overflow: "hidden",
      transform: [
        {
          translateZ: 0
        }
      ]
    };

    return <View style={mobileStyle}>{children}</View>;
  } else {
    return children;
  }
};

export default MobileModeIfDesktop;
