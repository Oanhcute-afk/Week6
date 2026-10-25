import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { ColorKey, Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - "); // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: CHỈ KHI đã chọn màu (picked khác undefined) hiện thêm 3 dòng dưới tên sản phẩm */}
          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút "XONG": nền colors.blue, bo góc 4, chữ trắng đậm.
                   Bấm → navigation.navigate("Product", { color: picked }, { merge: true }) */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate("Product", { color: picked }, { merge: true })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 14,
    backgroundColor: "#fff",
    minHeight: 152,
  },
  thumb: {
    width: 112,
    height: 132,
  },
  headerText: {
    flex: 1,
    paddingTop: 6,
    gap: 5,
  },
  small: {
    fontSize: 15,
    color: "#000000",
  },
  bold: {
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginTop: 2,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 18,
    color: "#000000",
  },
  swatches: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
  },
  swatch: {
    width: 85,
    height: 80,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  swatchOn: {
    borderWidth: 2,
    borderColor: colors.navy,
  },
  doneBtn: {
    height: 44,
    backgroundColor: "rgba(25, 82, 226, 0.58)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CA1536",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  doneText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9F2F2",
  },
});
