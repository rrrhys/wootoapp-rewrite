import { Button, Icon } from "react-native-elements";

import React from "react";
import { View } from "react-native";

export interface Props {
  onPress: () => void;
}

class BackButtonOverlay extends React.Component<Props> {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 36,
          height: 36
        }}
      >
        <Button
          onPress={this.props.onPress}
          icon={<Icon name="chevron-left" size={24} color="white" />}
        />
      </View>
    );
  }
}

export default BackButtonOverlay;
