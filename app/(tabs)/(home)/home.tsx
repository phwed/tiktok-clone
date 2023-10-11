import React from "react";
import { Alert, Dimensions, FlatList, Pressable, Share } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Play } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { Paragraph, Spinner, View } from "tamagui";

import { data as dummy } from "../../../assets/data.ts";
import CommentSheet from "../../../components/home/CommentSheet.tsx";
import Interactions from "../../../components/home/Interactions.tsx";

export default function Home() {
  const video = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [showSheet, toggleSheet] = React.useReducer((s) => !s, false);
  const [buffering, setBuffering] = React.useState(false);
  const [data, setData] = React.useState(dummy);
  const { width, height } = Dimensions.get("window");

  const sheet = React.useRef();

  const togglePlay = () => {
    if (isPlaying) {
      video.current.pauseAsync();
      setIsPlaying(false);
    } else {
      video.current.playAsync();
      setIsPlaying(true);
    }
  };

  const onPlayBackStatus = (status) => {
    if (status.isBuffering) {
      setBuffering(true);
    } else if (status.isBuffering === false) {
      setBuffering(false);
    }
  };

  const handleLikes = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.liked = !item.liked;
        item.liked ? item.likes++ : item.likes--;
      }

      return item;
    });

    setData(newData);
  };

  const handleSave = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.saved = !item.saved;
        item.saved ? item.saves++ : item.saves--;
      }

      return item;
    });

    setData(newData);
  };

  const onShare = async (url: string) => {
    try {
      const result = await Share.share({
        message: url
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={height}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <Pressable
            style={{ height: height, width: width, backgroundColor: "black" }}
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
                onPlaybackStatusUpdate={(status) => onPlayBackStatus(status)}
              />

              {!isPlaying ? (
                <View
                  zIndex={10}
                  position="absolute"
                  top={"40%"}
                >
                  <Ionicons
                    name="play"
                    color="rgba(255, 255, 255, 0.5)"
                    size={60}
                  />
                </View>
              ) : buffering ? (
                <View
                  zIndex={10}
                  position="absolute"
                  top={"45%"}
                >
                  <Spinner size="large" />
                </View>
              ) : null}
            </View>

            <Interactions
              commentCount={item.comments}
              LikesCount={item.likes}
              shareCount={item.shares}
              savedCount={item.saves}
              onSave={() => handleSave(item.id)}
              onLike={() => handleLikes(item.id)}
              onComment={() => {
                {
                  if (sheet.current) {
                    // @ts-ignore
                    sheet.current.expand();
                  }
                  toggleSheet();
                }
              }}
              onShare={() => onShare(item.videoUrl)}
              liked={item.liked}
              saved={item.saved}
            />
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

      <CommentSheet
        handleClose={() => {
          if (sheet.current) {
            // @ts-ignore
            sheet.current.collapse();
          }
          toggleSheet();
        }}
        toggleSheet={toggleSheet}
        show={showSheet}
        ref={sheet}
        comments={data}
        // onSheetChange={(index) => {
        //   console.log("index", index);
        // }}
      />
    </View>
  );
}
