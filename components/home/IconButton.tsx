import React from "react";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Paragraph, View, YStack } from "tamagui";

interface Props {
  icon: any;
  onPress: () => void;
  count: number;
  color?: string;
}

const IconButton = ({ icon, onPress, count, color = "white" }: Props) => {
  return (
    <Pressable
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}
      onPress={onPress}
    >
      <FontAwesome
        name={icon}
        size={30}
        color={color}
      />

      <Paragraph
        color="white"
        size="$5"
      >
        {count}
      </Paragraph>
    </Pressable>
  );
};

export default IconButton;
