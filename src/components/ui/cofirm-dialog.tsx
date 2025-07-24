import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ConfirmDialogProps = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  message,
  onConfirm,
  onCancel,
}) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.dialog}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirm]}>
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    width: 280,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginHorizontal: 8,
    minWidth: 80,
    alignItems: "center",
  },
  confirm: {
    backgroundColor: "#e53935",
  },
});

export default ConfirmDialog;