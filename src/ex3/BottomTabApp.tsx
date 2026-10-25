import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function PhoneCard({ item }: { item: Phone }) {
  return (
    <View style={s.card}>
      <View style={s.thumbBox}>
        <Image
          source={PHONE_COLORS[item.defaultColor].image}
          style={s.thumb}
          resizeMode="contain"
        />
      </View>
      <View style={s.cardInfo}>
        <Text style={s.cardTitle}>{item.name.split(" - ")[0]}</Text>
        <View style={s.ratingRow}>
          <Stars value={item.rating} size={13} />
          <Text style={s.reviewCount}>({item.reviewCount})</Text>
        </View>
        <View style={s.priceRow}>
          <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
          {item.oldPrice > item.price && (
            <Text style={s.oldPrice}>{formatPrice(item.oldPrice)}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 14, gap: 12 }}
      renderItem={({ item }) => <PhoneCard item={item} />}
    />
  );
}

// TODO 1: SearchTab — const [keyword, setKeyword] = useState("");
//         <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} />
//         Lọc PHONES theo keyword (không phân biệt hoa/thường: toLowerCase + includes), hiển thị kết quả.
//         Không có kết quả → hiện "Không có kết quả cho “...”".
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const results = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={s.searchRoot}>
      <View style={s.searchBar}>
        <Ionicons name="search-outline" size={18} color={colors.muted} />
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Nhập từ khóa (vd: aris, live, joy...)"
          placeholderTextColor={colors.muted}
          style={s.input}
        />
        {keyword.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.muted}
            onPress={() => setKeyword("")}
          />
        )}
      </View>

      {results.length === 0 ? (
        <View style={s.emptyWrap}>
          <Ionicons name="search" size={44} color={colors.line} />
          <Text style={s.muted}>Không có kết quả cho “{keyword}”</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
          renderItem={({ item }) => <PhoneCard item={item} />}
        />
      )}
    </View>
  );
}

// TODO 2: ProfileTab — vòng tròn Avatar (View bo tròn width=height=96, borderRadius=48, hiện chữ cái đầu)
//         + Name (chữ lớn, đậm) + 1 dòng email. Canh giữa màn hình.
function ProfileTab() {
  return (
    <View style={s.profileRoot}>
      <View style={s.profileCard}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>NA</Text>
        </View>
        <Text style={s.profileName}>Nguyễn Văn An</Text>
        <Text style={s.muted}>an.nguyen@example.com</Text>

        <View style={s.statsRow}>
          <View style={s.statItem}>
            <Text style={s.statNum}>12</Text>
            <Text style={s.statLabel}>Đơn hàng</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statItem}>
            <Text style={s.statNum}>4</Text>
            <Text style={s.statLabel}>Yêu thích</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statItem}>
            <Text style={s.statNum}>VIP</Text>
            <Text style={s.statLabel}>Hạng thẻ</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// TODO 3: export function BottomTabApp() — NavigationContainer > Tab.Navigator với screenOptions:
//         tabBarActiveTintColor: colors.red,
//         tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} .../>
//         3 Tab.Screen, đặt title tiếng Việt (Trang chủ / Tìm kiếm / Cá nhân).
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: colors.navy },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700", fontSize: 17 },
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            height: 58,
            paddingBottom: 6,
            paddingTop: 4,
            borderTopColor: "#E8ECF2",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#0B1F5C",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  thumbBox: {
    width: 66,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    width: 56,
    height: 66,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.muted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  searchRoot: {
    flex: 1,
    padding: 14,
    gap: 12,
    backgroundColor: colors.bg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D8DCE3",
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  profileRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.bg,
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    shadowColor: "#0B1F5C",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 4,
    borderColor: "#EEF2FF",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  muted: {
    fontSize: 14,
    color: colors.muted,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    width: "100%",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.navy,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#E2E8F0",
  },
});
