import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, FontSize } from "../../../constants/theme";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

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
   * This will add style to the button text
   */
  buttonTextStyle?: StyleProp<TextStyle>;
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
  buttonTextStyle,
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
  const iconPositionRight = icon?.position === "right" || icon?.position === undefined;

  return (
    <View style={[styles.pressableContainer, containerStyle]}>
      <Pressable
        android_ripple={{ color: Colors.primaryDark, foreground: true }}
        onPress={() => {
          onPress ? onPress() : null;
          onSelect ? onSelect() : null;
        }}
        onLongPress={() => (onLongPress ? onLongPress() : null)}
        disabled={disabled}
      >
        <LinearGradient
          colors={isSelected ? [Colors.primaryDark, "#022c22"] : (Colors.gradients.button as any)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
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
                color={isSelected ? Colors.textHighlight : Colors.text} // Highlight icon if selected
                style={iconStyle}
              />
            )}
            <Text style={[styles.buttonText, buttonTextStyle, isSelected && { color: Colors.textHighlight }]}>{label}</Text>
            {icon && iconVisible && iconPositionRight && (
              <Ionicons
                name={icon.icon}
                size={24}
                color={Colors.text} // Use theme text for contrast
                style={[iconStyle, styles.rightIcon]}
              />
            )}
          </View>
          {description && (
            <View style={[styles.buttonDescriptionContainer, descriptionContainerStyle]}>
              <Text style={[styles.buttonDescription, descriptionStyle, isSelected && { color: Colors.textSecondary }]}>{description}</Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  pressableContainer: {
    overflow: "hidden",
    borderRadius: 100, // Fully rounded (Pill shape)
    elevation: 6,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: Colors.primary, // Fallback
    marginVertical: 12,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingVertical: 24, // "Google Style" Big Padding
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1, // Nice border
    borderColor: Colors.border, // Subtle premium border
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonContainerSelected: {
    borderWidth: 3,
    borderColor: Colors.text, // High contrast border (Mint White)
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Keep text centered
    width: "100%", // Take full width to allow absolute icon positioning
  },
  buttonText: {
    fontSize: FontSize.medium,
    fontWeight: "bold",
    color: Colors.text,
    letterSpacing: 0.5,
    textAlign: "center", // Explicit center
  },
  rightIcon: {
    position: "absolute",
    right: 0,
  },
  buttonDescription: {
    fontSize: FontSize.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  buttonDescriptionContainer: {},
  disabledButtonContainer: {
    opacity: 0.6,
  },
});
