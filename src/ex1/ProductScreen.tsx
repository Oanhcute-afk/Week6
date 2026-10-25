import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.ratingRow}>
          <Stars value={phone.rating} size={22} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.helpCircle}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: nút viền xám, bo góc 6, chữ "4 MÀU-CHỌN MÀU"; nếu đã chọn màu (picked) thì chữ là "4 MÀU-CHỌN LOẠI".
                   Dấu ">" nằm sát lề phải (position:"absolute", right:12).
                   Bấm → navigation.navigate("ChooseColor", { color: picked }) */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chooseArrow}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: nút "CHỌN MUA": nền colors.red, bo góc 6, chữ trắng đậm, canh giữa, nằm SÁT ĐÁY màn hình */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  image: {
    width: "92%",
    height: "96%",
    maxHeight: 330,
  },
  info: {
    gap: 10,
    marginBottom: 32,
  },
  name: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  review: {
    fontSize: 15,
    color: "#000000",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  oldPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.58)",
    textDecorationLine: "line-through",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FA0000",
  },
  helpCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 14,
  },
  chooseBtn: {
    marginTop: 8,
    height: 36,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.46)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chooseText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
  },
  chooseArrow: {
    position: "absolute",
    right: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  buyBtn: {
    height: 44,
    backgroundColor: colors.red,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9F2F2",
  },
});
