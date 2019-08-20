import { StyleSheet, Text, View } from "react-native";

import React from "react";
import Root from "./app/setup";
import env from "./env";

export default function App() {
  const { version } = env;
  return <Root />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
