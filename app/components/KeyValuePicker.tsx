import { withTheme } from "react-native-elements";

import Picker from "react-native-simple-modal-picker";
import React from "react";

import { View } from "react-native";

import Card from "../primitives/Card";
import ListItem from "../primitives/ListItem";

export type pickableValue = number | string | { id: number; label: string };
export interface IKeyValuePickerProps {
  label: string;
  id: string | number;
  values: Array<string | number>;
  currentValue: string | number;
  defaultValue: string | number;
  placeholder?: string | number;
  onValueChanged: (key: string | number, value: string | number) => void;
}

export interface IKeyValuePickerState {
  showPicker: boolean;
  values: Array<string | number>;
}
class KeyValuePicker extends React.Component<
  IKeyValuePickerProps,
  IKeyValuePickerState
> {
  simplePicker;

  state = {
    showPicker: false,
    values: []
  };
  showPicker = () => {
    this.simplePicker.setModalVisible(true);
  };

  static getDerivedStateFromProps(
    nextProps: IKeyValuePickerProps,
    prevState: IKeyValuePickerState
  ) {
    const { showPicker } = prevState;

    // is the supplied data objects, or values?
    const isObject =
      nextProps.values.length > 0 && typeof nextProps.values[0] == "object";

    let values = [];
    values = nextProps.values.map((v, i) => {
      return { name: v, value: v };
    });
    return {
      showPicker,
      values
    };
  }

  render() {
    const {
      currentValue,
      defaultValue,
      label,
      placeholder,
      theme,
      containerStyle
    } = this.props;

    const { values } = this.state;
    return (
      <View>
        <Card containerStyle={{ padding: 0, margin: 0, ...containerStyle }}>
          <ListItem
            onPress={() => this.showPicker()}
            containerStyle={{ padding: 8, margin: 0 }}
            titleStyle={{ color: theme.colors.text }}
            rightTitleStyle={{ color: theme.colors.text }}
            rightTitle={
              currentValue
                ? currentValue
                : defaultValue
                ? defaultValue
                : placeholder
            }
            title={label}
            chevron={true}
          />
        </Card>

        <Picker
          style={{ flex: 1, width: 240 }}
          ref={instance => (this.simplePicker = instance)}
          data={values}
          label={"name"}
          value={"value"}
          onValueChange={value => {
            this.props.onValueChanged(this.props.id, value);
          }}
        />
      </View>
    );
  }
}

export default withTheme(KeyValuePicker);
