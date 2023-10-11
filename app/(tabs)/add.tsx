import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, Paragraph, View, XStack } from "tamagui";

export default function add() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      paddingTop={insets.top}
      paddingHorizontal="$4"
    >
      <XStack>
        <Button
          icon={X}
          color="white"
          bg="red"
          onPress={() => router.back()}
        />
      </XStack>
    </View>
  );
}
