import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontSize } from "../../../constants/theme";
import { useState } from "react";

export interface IPrimaryButton {
  label: string;
  description?: string;
  disabled?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  onLongPress?: () => void;

  /**
   ** This will add style `View` component that holds the `Pressable` component
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   ** This is the `View` component that holds the button label and icon
   */
  buttonStyle?: StyleProp<ViewStyle>;
  /**
   ** This will add style to the container of the button
   ** This is the `View` component that wraps the overall button
   */
  buttonContainerStyle?: StyleProp<ViewStyle>;
  /**
   ** This will add style to the description text
   ** This is the `Text` component
   */

  descriptionStyle?: StyleProp<TextStyle>;
  /**
   ** This will add style to the description container
   ** This is the `View` component that wraps the description text
   */
  descriptionContainerStyle?: StyleProp<ViewStyle>;
  /**
   ** This will add style to the icon
   ** This is the `Ionicons` component
   */
  iconStyle?: StyleProp<TextStyle>;
  icon?: {
    /**
     ** Default true
     */
    visible?: boolean;
    /**
     ** Default "right"
     */
    position?: "left" | "right";
    icon: keyof typeof Ionicons.glyphMap;
  };
}

const PrimaryButton: React.FC<IPrimaryButton> = ({
  label,
  description,
  disabled,
  containerStyle,
  buttonStyle,
  buttonContainerStyle,
  descriptionStyle,
  descriptionContainerStyle,
  iconStyle,
  onPress,
  isSelected,
  onSelect,
  onLongPress,
  icon,
}) => {
  const iconVisible = icon?.visible || icon?.visible === undefined;
  const iconPositionLeft = icon?.position === "left";
  const iconPositionRight =
    icon?.position === "right" || icon?.position === undefined;

  return (
    <View style={[styles.pressableContainer, containerStyle]}>
      <Pressable
        android_ripple={{ color: "#00000028", foreground: true }}
        onPress={() => {
          onPress ? onPress() : null;
          onSelect ? onSelect() : null;
        }}
        onLongPress={() => (onLongPress ? onLongPress() : null)}
        disabled={disabled}
      >
        <View
          style={[
            styles.buttonContainer,
            isSelected && styles.buttonContainerSelected,
            buttonContainerStyle,
            disabled && styles.disabledButtonContainer,
          ]}
        >
          <View style={[styles.button, buttonStyle]}>
            {icon && iconVisible && iconPositionLeft && (
              <Ionicons
                name={icon.icon}
                size={24}
                color="black"
                style={iconStyle}
              />
            )}
            <Text style={styles.buttonText}>{label}</Text>
            {icon && iconVisible && iconPositionRight && (
              <Ionicons
                name={icon.icon}
                size={24}
                color="black"
                style={iconStyle}
              />
            )}
          </View>
          {description && (
            <View
              style={[
                styles.buttonDescriptionContainer,
                descriptionContainerStyle,
              ]}
            >
              <Text style={[styles.buttonDescription, descriptionStyle]}>
                {description}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  pressableContainer: {
    overflow: "hidden",
    borderRadius: 100,
  },
  buttonContainer: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 100,
  },
  buttonContainerSelected: {
    borderWidth: 3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    fontSize: FontSize.large,
  },
  buttonDescription: {
    fontSize: FontSize.small,
  },
  buttonDescriptionContainer: {},
  disabledButtonContainer: {
    opacity: 0.5,
  },
});
