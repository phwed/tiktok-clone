import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { X } from "@tamagui/lucide-icons";
import { Paragraph, View, XStack } from "tamagui";

interface Props {
  comments: any[];
  show: boolean;
  handleClose: () => void;
  toggleSheet: () => void;
  //   onSheetChange: (index: number) => void;
}

const CommentSheet = forwardRef<BottomSheet, Props>(
  ({ comments, show, toggleSheet, handleClose }, ref: React.Ref<any>) => {
    // variables
    const snapPoints = useMemo(() => ["60%", "60%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      if (index == -1) {
        toggleSheet();
      }
    }, []);

    const insets = useSafeAreaInsets();

    return (
      <React.Fragment>
        {show && (
          <View
            height={"100%"}
            position="absolute"
            zIndex={10}
            bottom={0}
            width="100%"
          >
            <BottomSheet
              ref={ref}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              enablePanDownToClose
              keyboardBehavior="extend"
              handleComponent={() => (
                <XStack
                  p="$4"
                  alignItems="center"
                  jc="space-between"
                >
                  <Paragraph textAlign="center">
                    Comments {comments.length}
                  </Paragraph>
                  <Pressable
                    style={{
                      padding: 10
                    }}
                    onPress={() => handleClose()}
                  >
                    <X />
                  </Pressable>
                </XStack>
              )}
            >
              <View flex={1}></View>
              <BottomSheetTextInput
                style={{
                  marginTop: 8,
                  marginBottom: 10,
                  marginHorizontal: 16,
                  borderRadius: 10,
                  fontSize: 16,
                  lineHeight: 20,
                  padding: 8,
                  backgroundColor: "rgba(151, 151, 151, 0.25)"
                }}
              />
            </BottomSheet>
          </View>
        )}
      </React.Fragment>
    );
  }
);

// display name
CommentSheet.displayName = "CommentSheet";

export default CommentSheet;
