import { Modal, StyleSheet, Text, View, ModalProps } from "react-native";
import { Colors, FontSize } from "../../constants/theme";
import PrimaryButton from "./PrimaryButton";
import { Ionicons } from "@expo/vector-icons";

interface AlertModalProps extends ModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  emoji?: any;
}

const AlertModal: React.FC<AlertModalProps> = ({ visible, title, message, buttonText = "OK", onClose, icon = "alert-circle", emoji, ...props }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" {...props}>
      <View style={styles.overlay}>
        <View style={styles.glassCard}>
          <Text style={styles.emoji}>{emoji || <Ionicons name={icon} size={64} color={Colors.textHighlight} />}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <PrimaryButton label={buttonText} onPress={onClose} containerStyle={styles.buttonContainer} />
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  glassCard: {
    width: "85%",
    maxWidth: 400,
    backgroundColor: "rgba(10, 30, 25)",
    borderColor: Colors.glassBorder,
    borderWidth: 1,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    textAlign: "center",
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  message: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
  },
});
