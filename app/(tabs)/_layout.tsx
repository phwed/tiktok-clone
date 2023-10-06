import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Mail, Plus, User, User2, Users2 } from "@tamagui/lucide-icons";
import { Tabs, useSegments } from "expo-router";
import { useRouter } from "expo-router";
import { Button, Paragraph, View } from "tamagui";

export default function TabsLayout() {
  const segment = useSegments();
  const router = useRouter();
  const hideTab = segment[segment.length - 1] === "add";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: hideTab ? "none" : "flex",
          alignItems: "center",
          paddingBottom: insets.bottom + 10,
          height: insets.bottom + 60
        }
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              alignItems="center"
              justifyContent="center"
              paddingTop="$4"
            >
              <Home color={focused ? "red" : "$color"} />
              <Paragraph
                size="$1"
                color={focused ? "red" : "$color"}
              >
                Home
              </Paragraph>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              alignItems="center"
              justifyContent="center"
              paddingTop="$4"
            >
              <Users2 color={focused ? "red" : "$color"} />
              <Paragraph
                size="$1"
                color={focused ? "red" : "$color"}
              >
                Friends
              </Paragraph>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              marginTop="$3"
              backgroundColor={"red"}
              color="white"
              icon={<Plus size="$icon.md" />}
              onPress={() => router.push("/add")}
            />
          )
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              alignItems="center"
              justifyContent="center"
              paddingTop="$4"
            >
              <Mail color={focused ? "red" : "$color"} />
              <Paragraph
                size="$1"
                color={focused ? "red" : "$color"}
              >
                Inbox
              </Paragraph>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              alignItems="center"
              justifyContent="center"
              paddingTop="$4"
            >
              <User2 color={focused ? "red" : "$color"} />
              <Paragraph
                size="$1"
                color={focused ? "red" : "$color"}
              >
                Profile
              </Paragraph>
            </View>
          )
        }}
      />
    </Tabs>
  );
}
