import React from "react";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { Button, Paragraph, View } from "tamagui";

export default function index() {
  const [mount, setMounted] = React.useState(false);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      if (!mount) {
        setMounted(true);
        return;
      }
      router.push("/home");
    }, [mount])
  );

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Link
        asChild
        href="/home"
      >
        <Button
          bg="red"
          color="white"
        >
          LOGIN
        </Button>
      </Link>
    </View>
  );
}
