import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import { useFavorites } from "./FavoritesContext";

export function ProductRow({
  phone,
  onPress,
}: {
  phone: Phone;
  onPress: () => void;
}) {
  const { has, toggle } = useFavorites();
  const saved = has(phone.id);
  const discount =
    phone.oldPrice > phone.price
      ? Math.round(((phone.oldPrice - phone.price) / phone.oldPrice) * 100)
      : 0;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.thumbBox}>
        <Image
          source={PHONE_COLORS[phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {phone.name}
        </Text>

        <View style={styles.ratingRow}>
          <Stars value={phone.rating} size={13} />
          <Text style={styles.reviewText}>({phone.reviewCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {phone.oldPrice > phone.price && (
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          )}
        </View>

        <View style={styles.footerRow}>
          <View style={styles.colorDots}>
            {phone.colors.map((c) => (
              <View
                key={c}
                style={[styles.dot, { backgroundColor: PHONE_COLORS[c].hex }]}
              />
            ))}
          </View>
          <Text style={styles.supplierText}>{phone.supplier}</Text>
        </View>
      </View>

      <View style={styles.rightCol}>
        <Pressable
          hitSlop={8}
          onPress={(e) => {
            e.stopPropagation();
            toggle(phone.id);
          }}
          style={styles.heartBtn}
        >
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={20}
            color={saved ? colors.red : colors.muted}
          />
        </Pressable>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    gap: 12,
    shadowColor: "#0B1F5C",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  thumbBox: {
    width: 78,
    height: 88,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  thumb: {
    width: 64,
    height: 76,
  },
  discountBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: colors.red,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  info: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 19,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reviewText: {
    fontSize: 12,
    color: colors.muted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  colorDots: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  supplierText: {
    fontSize: 11,
    color: colors.muted,
  },
  rightCol: {
    alignItems: "center",
    justifyContent: "space-between",
     alignSelf: "stretch",
    paddingVertical: 2,
  },
  heartBtn: {
    padding: 4,
  },
});
