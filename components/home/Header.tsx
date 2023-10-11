import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ListVideo } from "@tamagui/lucide-icons";
import { useRouter, useSegments } from "expo-router";
import { Button, Paragraph, View, XStack } from "tamagui";

export default function Header() {
  const insets = useSafeAreaInsets();
  const segment = useSegments();
  const router = useRouter();

  const pages = [
    {
      name: "Explore",
      route: "/explore"
    },
    {
      name: "Following",
      route: "/following"
    },
    {
      name: "Home",
      route: "/home"
    }
  ];

  return (
    <XStack
      zIndex={100}
      bg="transparent"
      position="absolute"
      top={insets.top}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      space="$5"
      px="$4"
    >
      <Pressable>
        <MaterialIcons
          name="live-tv"
          size={30}
          color="white"
        />
      </Pressable>
      <XStack
        space="$3"
        alignItems="center"
        justifyContent="center"
      >
        {pages.map((page, index) => (
          <Pressable
            key={index}
            onPress={() => {
              router.push(page.route as any);
            }}
            style={{
              gap: 5,
              alignItems: "center"
            }}
          >
            <Paragraph
              size="$5"
              allowFontScaling={false}
              color="white"
            >
              {page.name}
            </Paragraph>

            {/* strip the / from page.route */}

            {segment[segment.length - 1] === page.route.slice(1) ? (
              <View
                bg="white"
                width={25}
                height={3}
                borderRadius={2}
              />
            ) : (
              <View
                bg="transparent"
                width={25}
                height={3}
                borderRadius={2}
              />
            )}
          </Pressable>
        ))}
      </XStack>

      <Pressable>
        <MaterialIcons
          name="search"
          size={30}
          color="white"
        />
      </Pressable>
    </XStack>
  );
}
