import React from "react";
import { Dimensions, FlatList, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Play } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { Paragraph, View } from "tamagui";

import { data } from "../../../assets/data.ts";

export default function Home() {
  const video = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const { width, height } = Dimensions.get("window");

  const togglePlay = () => {
    if (isPlaying) {
      video.current.pauseAsync();
      setIsPlaying(false);
    } else {
      video.current.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      pagingEnabled={true}
      snapToInterval={height}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <Pressable
          style={{ height: height, width: width, backgroundColor: "red" }}
          onPress={() => {
            togglePlay();
          }}
        >
          <View
            flex={1}
            ai="center"
          >
            <Video
              ref={video}
              style={{
                flex: 1,
                width: "100%"
              }}
              source={{
                uri: item.videoUrl
              }}
              useNativeControls={false}
              resizeMode={ResizeMode.COVER}
              shouldPlay={isPlaying}
              isLooping={true}
              // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />

            {!isPlaying ? (
              <View
                zIndex={10}
                position="absolute"
                top={"50%"}
              >
                <Ionicons
                  name="play"
                  color="rgba(255, 255, 255, 0.5)"
                  size={60}
                />
              </View>
            ) : null}
          </View>
        </Pressable>
      )}
      ListEmptyComponent={() => (
        <View
          jc="center"
          ai="center"
          pt="50%"
        >
          <Paragraph>Nothing to see here</Paragraph>
        </View>
      )}
    />
  );
}
