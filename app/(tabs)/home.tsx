import React from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Play } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { Paragraph, View } from "tamagui";

export default function Home() {
  const video = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

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
    <Pressable
      style={{ flex: 1 }}
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
            uri: "https://assets.mixkit.co/videos/preview/mixkit-white-cat-lying-among-the-grasses-seen-up-close-22732-large.mp4"
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          shouldPlay={true}
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
  );
}
