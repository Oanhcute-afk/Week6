import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

type ExerciseKey = "ex1_2" | "ex3" | "ex4" | "ex5";

export default function App() {
  const [exercise, setExercise] = useState<ExerciseKey>("ex5");

  return (
    <SafeAreaProvider>
      <View style={styles.outer}>
        <View style={styles.switcher}>
          <Pressable
            style={[styles.btn, exercise === "ex1_2" && styles.btnActive]}
            onPress={() => setExercise("ex1_2")}
          >
            <Text style={[styles.btnText, exercise === "ex1_2" && styles.btnTextActive]}>
              Bài 1 + 2
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, exercise === "ex3" && styles.btnActive]}
            onPress={() => setExercise("ex3")}
          >
            <Text style={[styles.btnText, exercise === "ex3" && styles.btnTextActive]}>
              Bài 3: Tab
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, exercise === "ex4" && styles.btnActive]}
            onPress={() => setExercise("ex4")}
          >
            <Text style={[styles.btnText, exercise === "ex4" && styles.btnTextActive]}>
              Bài 4: Stack+Tab
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, exercise === "ex5" && styles.btnActive]}
            onPress={() => setExercise("ex5")}
          >
            <Text style={[styles.btnText, exercise === "ex5" && styles.btnTextActive]}>
              Bài 5: Drawer
            </Text>
          </Pressable>
        </View>

        <View style={styles.phoneFrame}>
          {exercise === "ex1_2" && <SelectPhoneApi />}
          {exercise === "ex3" && <BottomTabApp />}
          {exercise === "ex4" && <StackTabApp />}
          {exercise === "ex5" && <DrawerApp />}
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Platform.OS === "web" ? "#E5E5E5" : "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switcher: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#D8DCE3",
  },
  btnActive: {
    backgroundColor: colors.blue,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },
  btnTextActive: {
    color: "#fff",
  },
  phoneFrame: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 360 : undefined,
    maxHeight: Platform.OS === "web" ? 640 : undefined,
    backgroundColor: "#fff",
    overflow: "hidden",
    ...(Platform.OS === "web"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        }
      : {}),
  },
});
