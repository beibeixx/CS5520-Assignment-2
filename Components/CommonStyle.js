import { StyleSheet, Text, View } from "react-native";
import { shapeHelper } from "../Helper/shapeHelper";
import { colorHelper } from "../Helper/colorHelper";
import { fontHelper } from "../Helper/fontHelper";

export const modifyStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.addPage,
  },
  cancelButton: {
    backgroundColor: colorHelper.button.cancel,
  },
  saveButton: {
    backgroundColor: colorHelper.button.save,
  },
  cancelButton: {
    backgroundColor: colorHelper.button.cancel,
    flex: 1,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colorHelper.button.save,
  },
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "space-between", 
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
  checkboxText: {
    fontWeight: fontHelper.style.bold,
  },
  bottomContainer: {
    paddingTop: 250,
    gap: 10,
  },
  pressedDelete: {
    backgroundColor: colorHelper.button.delete,
  },
});

export const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.mainPage,
  },
  icon: {
    flexDirection: "row",
    gap: 2,
  },
  pressIcon: {
    backgroundColor: colorHelper.text.selected,
  },
});
