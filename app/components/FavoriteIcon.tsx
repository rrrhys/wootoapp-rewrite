import { Button, Icon } from "react-native-elements";

import React from "react";
import { View } from "react-native";

export interface Props {
  onPress: () => void;
  id: number;
  size: number;
}

class FavoriteIcon extends React.Component<Props> {
  render() {
    const { size } = this.props;
    return (
      <View
        style={{
          width: size,
          height: size,
          position: "absolute",
          top: 10,
          right: 10
        }}
      >
        <Button
          onPress={this.props.onPress}
          type="clear"
          icon={
            <Icon
              name="heart"
              type="font-awesome"
              size={size}
              color="#00000022"
            />
          }
        />
      </View>
    );
  }
}

export default FavoriteIcon;
