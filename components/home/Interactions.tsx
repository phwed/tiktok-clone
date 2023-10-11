import React from "react";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Paragraph, View, YStack } from "tamagui";

import IconButton from "./IconButton";

interface Props {
  commentCount: number;
  LikesCount: number;
  shareCount: number;
  savedCount: number;
  onSave: () => void;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  liked: boolean;
  saved: boolean;
}

export default function Interactions({
  commentCount,
  LikesCount,
  shareCount,
  savedCount,
  onSave,
  onLike,
  onComment,
  onShare,
  liked,
  saved
}: Props) {
  return (
    <YStack
      position="absolute"
      right={20}
      bottom={"15%"}
      space={"$4"}
    >
      <IconButton
        color={liked ? "red" : "white"}
        icon="heart"
        onPress={onLike}
        count={LikesCount}
      />
      <IconButton
        icon="commenting"
        onPress={onComment}
        count={commentCount}
      />
      <IconButton
        color={saved ? "yellow" : "white"}
        icon="bookmark"
        onPress={onSave}
        count={savedCount}
      />
      <IconButton
        icon="share"
        onPress={onShare}
        count={shareCount}
      />
    </YStack>
  );
}
