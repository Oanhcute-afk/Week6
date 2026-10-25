import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  // TODO 3: FlatList data={PHONES}; mỗi dòng là <ProductRow phone={item} onPress={...} />
  //         onPress: navigation.navigate("ProductDetails", { id: item.id })
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 12,
    backgroundColor: colors.bg,
  },
});
