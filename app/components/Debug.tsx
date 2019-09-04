import { Button, Icon } from "react-native-elements";
import { Text, View } from "react-native";

import React from "react";

export interface Props {
  children: any;
}

const showDebugs = true;

const Debug = props => {
  if (!showDebugs) {
    return false;
  }
  return (
    <View
      style={{
        backgroundColor: "#ff0000",
        borderWidth: 1,
        borderColor: "#000000"
      }}
    >
      <Text>{props.children}</Text>
    </View>
  );
};

export default Debug;
