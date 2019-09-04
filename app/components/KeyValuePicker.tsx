import { Card, ListItem } from "react-native-elements";
import { Text, View } from "react-native";

import React from "react";
import { number } from "prop-types";

type pickableValue = number | string | { id: number; label: string };
export interface IKeyValuePickerProps {
  label: string;
  key: string;
  values: Array<pickableValue>;
  currentValue: pickableValue;
  defaultValue: pickableValue;
  onValueChanged: (key: string, value: number) => void;
}
class KeyValuePicker extends React.Component<IKeyValuePickerProps> {
  render() {
    const { currentValue, defaultValue, label } = this.props;
    return (
      <Card containerStyle={{ padding: 0 }}>
        <ListItem
          containerStyle={{ padding: 8 }}
          rightTitle={currentValue ? currentValue : defaultValue}
          title={label}
          chevron={true}
        />
      </Card>
    );
  }
}

export default KeyValuePicker;
