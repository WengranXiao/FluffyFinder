import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const Modal = ({ isVisible, buttons, topDistance }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.modalContainer, { top: topDistance }]}>
      <View style={styles.modal}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: button.color }]}
            onPress={button.onPress}
          >
            <Text style={styles.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    // top: 40,
    right: 0,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 14,
  },

  button: {
    borderRadius: 6,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Modal;
