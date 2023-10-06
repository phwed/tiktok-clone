import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";
import { Slot } from "expo-router";
import { Paragraph, View } from "tamagui";

import VideoHeader from "../../../components/home/Header";

import Explore from "./explore";
import Following from "./following";
import Home from "./home";
import Header from "../../../components/home/Header";

const Tab = createMaterialTopTabNavigator();

export default function HomeLayout() {
  return (
    <View flex={1}>
      <Header/>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: "none"
          }
        }}
      >
        <Tab.Screen
          name="explore"
          component={Explore}
        />
        <Tab.Screen
          name="following"
          component={Following}
        />
        <Tab.Screen
          name="home"
          component={Home}
        />
      </Tab.Navigator>
    </View>
  );
}
