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
    flexDirection: "row",
    gap: 20,
    paddingRight: 10,
  },
  checkboxText: {
    color: colorHelper.text.updateSpecial,
    fontWeight: fontHelper.style.bold,
  },
  bottomContainer: {
    paddingTop: 250,
    gap: 10,
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
});