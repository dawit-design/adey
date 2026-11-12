import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

export default function AdeyStamp({
  placeName,
  date,
  size = "large",
}) {
  const formattedDate = date
    ? new Date(date)
        .toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        })
        .toUpperCase()
    : "ETHIOPIA";

  return (
    <View
      style={[
        styles.stamp,
        size === "small" && styles.stampSmall,
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          size === "small" &&
            styles.innerCircleSmall,
        ]}
      >
        <Ionicons
          name="compass-outline"
          size={size === "small" ? 15 : 24}
          color="#A9643B"
        />

        <Text
          style={[
            styles.adey,
            size === "small" && styles.adeySmall,
          ]}
        >
          ADEY
        </Text>

        {size !== "small" && (
          <Text
            style={styles.place}
            numberOfLines={1}
          >
            {placeName || "ETHIOPIA"}
          </Text>
        )}

        <Text
          style={[
            styles.date,
            size === "small" && styles.dateSmall,
          ]}
        >
          {formattedDate}
        </Text>
      </View>
    </View>
  );
}