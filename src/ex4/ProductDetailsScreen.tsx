import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { ColorKey } from "../types";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: lấy id rồi tìm phone trong PHONES
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();
  const [selectedColor, setSelectedColor] = useState<ColorKey>(
    phone?.defaultColor ?? "blue"
  );

  // TODO 5: không tìm thấy → "Không tìm thấy sản phẩm #id"
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  // TODO 6: hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp
  // TODO 7: nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" → toggle(phone.id)
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.root}>
      <View style={styles.imageCard}>
        <Image
          source={PHONE_COLORS[selectedColor].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.colorSwitchRow}>
          {phone.colors.map((c) => (
            <Pressable
              key={c}
              onPress={() => setSelectedColor(c)}
              style={[
                styles.colorChip,
                selectedColor === c && styles.colorChipActive,
              ]}
            >
              <View
                style={[styles.colorDot, { backgroundColor: PHONE_COLORS[c].hex }]}
              />
              <Text
                style={[
                  styles.colorChipText,
                  selectedColor === c && styles.colorChipTextActive,
                ]}
              >
                {PHONE_COLORS[c].label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.badgeTag}>
          <Ionicons name="shield-checkmark" size={13} color={colors.red} />
          <Text style={styles.badgeTagText}>{phone.badge}</Text>
        </View>

        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.muted}>({phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="storefront-outline" size={16} color={colors.blue} />
          <Text style={styles.supplier}>
            Cung cấp bởi: <Text style={styles.supplierBold}>{phone.supplier}</Text>
          </Text>
        </View>
      </View>

      <Pressable
        style={[styles.favBtn, saved && styles.favBtnActive]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[styles.favText, saved && styles.favTextActive]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  root: {
    padding: 16,
    gap: 14,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  notFound: {
    fontSize: 16,
    color: colors.red,
    fontWeight: "600",
  },
  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
    gap: 12,
  },
  image: {
    width: 185,
    height: 205,
  },
  colorSwitchRow: {
    flexDirection: "row",
    gap: 8,
  },
  colorChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "transparent",
  },
  colorChipActive: {
    backgroundColor: "#EEF2FF",
    borderColor: colors.blue,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  colorChipText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  colorChipTextActive: {
    color: colors.blue,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },
  badgeTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.red,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  muted: {
    fontSize: 13,
    color: colors.muted,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  supplier: {
    fontSize: 14,
    color: colors.muted,
  },
  supplierBold: {
    color: colors.text,
    fontWeight: "700",
  },
  favBtn: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: colors.red,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  favBtnActive: {
    backgroundColor: colors.red,
  },
  favText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.red,
  },
  favTextActive: {
    color: "#fff",
  },
});
