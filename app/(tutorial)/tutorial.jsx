import { View, Pressable, Text, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession, useTheme } from "../../global";
import { Tab } from "@rneui/themed";
import { PressableOpacity } from "../../components/common/button";
import Gradient from "../../components/common/gradients/gradient";
import { useAPI } from "../../global";
import { paletteSets } from "../../components/avatar/palettes";

import Avatar, { baseAvatar } from "../../components/avatar/avatar";
import { AvatarBuilder } from "../../components/avatar/builder";
import { AvatarAssetSync } from "../../components/admin/assetSync";

const TutorialView = () => {
  const [itemColorIndex, setItemColorIndex] = useState(-1);
  const [syncAssets, setSyncAssets] = useState(false);
  
  const { theme } = useTheme();
  const { session } = useSession();
  const API = useAPI();

  const builder = AvatarBuilder({
    avatarData: baseAvatar('M'),
    gender: 'M'
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER */}
      <Stack.Screen options={{headerTitle: "Create Avatar"}} />

      {/* ASSET SYNC TOGGLE (ADMIN) */}
      { session.user.is_admin &&
        <PressableOpacity
          onPress={() => setSyncAssets(true)}
          disabled={syncAssets ? true : false}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            margin: 10,
            padding: 8,
            borderRadius: 15,
            backgroundColor: theme.primary,
            zIndex: 100,
            ...SHADOWS.md
          }}
        >
          <MaterialCommunityIcons
            name="database-sync"
            size={36}
            color={theme.selected}
          />
        </PressableOpacity>
      }

      {/* ASSET SYNC COMPONENT */}
      { syncAssets && session.user.is_admin &&
        <AvatarAssetSync setSyncAssets={setSyncAssets} />
      }

      {/* AVATAR */}
      { Object.keys(builder).length > 0 &&
        <Avatar avatar={builder.avatar} />
      }

    </SafeAreaView>
  )  
}

const styles = {
  genderButtonWrapper: {
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 15,
    aspectRatio: 2,
    height: 65
  },
  genderButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderWidth: 3,
    paddingHorizontal: 10
  }
}


export default TutorialView;