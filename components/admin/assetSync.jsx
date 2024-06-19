import { View } from "react-native";
import { Chip } from "@rneui/themed";
import avatarItems from "../avatar/items";
import { paletteSets } from "../avatar/palettes";
import { useAPI } from "../../global";
import { useTheme } from "../../global";
import { SHADOWS } from "../../constants";
import { useEffect, useState } from "react";

export const AvatarAssetSync = ({setSyncAssets}) => {
  const { theme } = useTheme();
  const API = useAPI();

  const [syncCheck, setSyncCheck] = useState("Syncing Items...");

  const syncItemSets = async () => {
    const results = await API.post("/avatar/sync/items/", JSON.stringify(avatarItems), 'application/json');
    if (results.status == 200) {
      setSyncCheck("Syncing Palettes...");
    } else {
      setSyncCheck("Error");
      setTimeout(() => {
        setSyncAssets(false);
      }, 1000);
    }
  }

  const syncPaletteSets = async () => {
    const results = await API.post("/avatar/sync/palettes/", JSON.stringify(paletteSets), 'application/json');
    if (results.status == 200) {
      setSyncCheck("Done");
    } else {
      setSyncCheck("Error");
      setTimeout(() => {
        setSyncAssets(false);
      }, 1000);
    }
  }


  useEffect(() => {
    if (syncCheck === "Syncing Items...") {
      syncItemSets();
    } else if (syncCheck === "Syncing Palettes...") {
      syncPaletteSets();
    } else if (syncCheck === "Done") {
      setTimeout(() => {
        setSyncAssets(false);
      }, 1000);
    }
  }, [syncCheck]);

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 0,
      right: 0
    }}>
      <Chip
        title={syncCheck === null ? "Syncing Assets..." : syncCheck}
        titleStyle={{
          color: theme.highlight,
        }}
        icon={{
          name: syncCheck === "Done" ? 'check' : syncCheck === "Error" ? 'alert-circle' : 'sync',
          type: 'material-community',
          size: 20,
          color: theme.highlight
        }}
        iconRight
        type="solid"
        color={syncCheck === "Done" ? theme.selected : syncCheck === "Error" ? theme.cancel : theme.secondary}
        containerStyle={{
          marginTop: 18,
          ...SHADOWS.md
        }}
      />
    </View>
  )
}