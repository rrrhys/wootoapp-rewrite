import { Card, ListItem } from "react-native-elements";

import Picker from "react-native-simple-modal-picker";
import React from "react";

export type pickableValue = number | string | { id: number; label: string };
export interface IKeyValuePickerProps {
  label: string;
  key: string;
  values: Array<pickableValue>;
  currentValue: pickableValue;
  defaultValue: pickableValue;
  onValueChanged: (key: string, value: number) => void;
}

export interface IKeyValuePickerState {
  showPicker: boolean;
}
class KeyValuePicker extends React.Component<
  IKeyValuePickerProps,
  IKeyValuePickerState
> {
  state = {
    showPicker: false
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
    if (isObject) {
      values = nextProps.values.map((v, i) => {
        return { value: v.id, name: v.label };
      });
    } else {
      values = nextProps.values.map((v, i) => {
        return { name: v, value: v };
      });
    }
    return {
      showPicker,
      values
    };
  }

  render() {
    const { currentValue, defaultValue, label } = this.props;

    const { values } = this.state;
    return [
      <Card containerStyle={{ padding: 0 }}>
        <ListItem
          onPress={() => this.showPicker()}
          containerStyle={{ padding: 8 }}
          rightTitle={currentValue ? currentValue : defaultValue}
          title={label}
          chevron={true}
        />
      </Card>,

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
    ];
  }
}

export default KeyValuePicker;
