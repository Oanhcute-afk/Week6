import React, { createContext, useContext, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (nâng cao): đưa notify/dark lên Context để chế độ tối đổi nền cả màn Home và Profile.
interface SettingsCtx {
  notify: boolean;
  setNotify: (v: boolean) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsCtx>({
  notify: true,
  setNotify: () => {},
  dark: false,
  setDark: () => {},
});

const useSettings = () => useContext(SettingsContext);

function HomeScreen() {
  const { dark, notify } = useSettings();
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <View style={[s.welcomeCard, dark && s.darkCard]}>
        <View style={[s.iconCircle, dark && s.darkIconCircle]}>
          <Ionicons
            name="sparkles"
            size={34}
            color={dark ? "#60A5FA" : colors.blue}
          />
        </View>
        <Text style={[s.big, dark && s.darkText]}>Xin chào 👋</Text>
        <Text style={[s.subText, dark && s.darkMuted]}>
          Kéo từ mép trái hoặc bấm nút ☰ trên thanh tiêu đề để mở Drawer Menu.
        </Text>
        <View style={[s.pillRow, dark && s.darkPill]}>
          <Ionicons
            name={notify ? "notifications" : "notifications-off-outline"}
            size={15}
            color={notify ? colors.red : colors.muted}
          />
          <Text style={[s.pillText, dark && s.darkText]}>
            Thông báo đang {notify ? "BẬT" : "TẮT"}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <View style={[s.profileCard, dark && s.darkCard]}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>NA</Text>
        </View>
        <Text style={[s.big, dark && s.darkText]}>Nguyễn Văn An</Text>
        <Text style={[s.muted, dark && s.darkMuted]}>
          an.nguyen@example.com
        </Text>

        <View style={[s.infoList, dark && s.darkBorder]}>
          <View style={s.infoItem}>
            <Ionicons name="call-outline" size={18} color={colors.blue} />
            <Text style={[s.infoText, dark && s.darkText]}>0901 234 567</Text>
          </View>
          <View style={s.infoItem}>
            <Ionicons name="location-outline" size={18} color={colors.red} />
            <Text style={[s.infoText, dark && s.darkText]}>
              TP. Hồ Chí Minh, Việt Nam
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// TODO 1: SettingsScreen — 2 state: notify (mặc định true) và dark (mặc định false).
//         Mỗi dòng: <Text>Nhận thông báo</Text> <Switch value={notify} onValueChange={setNotify} />
//         Dòng cuối hiển thị: "Thông báo: BẬT/TẮT · Giao diện: tối/sáng".
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();

  return (
    <View style={[s.settingsRoot, dark && s.darkBg]}>
      <View style={[s.settingRow, dark && s.darkCard]}>
        <View style={s.settingLeft}>
          <View style={[s.settingIcon, { backgroundColor: "#FEE2E2" }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.red} />
          </View>
          <View>
            <Text style={[s.settingTitle, dark && s.darkText]}>
              Nhận thông báo
            </Text>
            <Text style={[s.settingDesc, dark && s.darkMuted]}>
              Cập nhật khuyến mãi và đơn hàng
            </Text>
          </View>
        </View>
        <Switch
          value={notify}
          onValueChange={setNotify}
          trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
          thumbColor={notify ? colors.red : "#F3F4F6"}
        />
      </View>

      <View style={[s.settingRow, dark && s.darkCard]}>
        <View style={s.settingLeft}>
          <View style={[s.settingIcon, { backgroundColor: "#E0E7FF" }]}>
            <Ionicons name="moon-outline" size={20} color={colors.blue} />
          </View>
          <View>
            <Text style={[s.settingTitle, dark && s.darkText]}>
              Giao diện tối
            </Text>
            <Text style={[s.settingDesc, dark && s.darkMuted]}>
              Đổi màu nền toàn bộ ứng dụng
            </Text>
          </View>
        </View>
        <Switch
          value={dark}
          onValueChange={setDark}
          trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
          thumbColor={dark ? colors.blue : "#F3F4F6"}
        />
      </View>

      <View style={[s.statusBox, dark && s.darkCard]}>
        <Text style={[s.statusText, dark && s.darkText]}>
          Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện:{" "}
          {dark ? "tối" : "sáng"}
        </Text>
      </View>
    </View>
  );
}

// TODO 2: export function DrawerApp() — NavigationContainer > Drawer.Navigator
//         drawerIcon: Ionicons theo tên route (home-outline / person-outline / settings-outline)
//         drawerActiveTintColor: colors.red; 3 Drawer.Screen với title tiếng Việt.
const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  const value = useMemo(
    () => ({ notify, setNotify, dark, setDark }),
    [notify, dark]
  );

  return (
    <SettingsContext.Provider value={value}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: dark ? "#1E293B" : colors.navy,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "700",
              fontSize: 17,
            },
            drawerActiveTintColor: colors.red,
            drawerInactiveTintColor: dark ? "#CBD5E1" : colors.text,
            drawerStyle: {
              backgroundColor: dark ? "#0F172A" : "#fff",
              width: 250,
            },
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: "600",
            },
            drawerIcon: ({ color, size }) => (
              <Ionicons name={ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Trang chủ" }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Hồ sơ" }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Cài đặt" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.bg,
  },
  darkBg: {
    backgroundColor: "#0F172A",
  },
  darkCard: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  darkText: {
    color: "#F8FAFC",
  },
  darkMuted: {
    color: "#94A3B8",
  },
  darkBorder: {
    borderTopColor: "#334155",
  },
  welcomeCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    shadowColor: "#0B1F5C",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  darkIconCircle: {
    backgroundColor: "#334155",
  },
  big: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  subText: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  darkPill: {
    backgroundColor: "#0F172A",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
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
  muted: {
    fontSize: 14,
    color: colors.muted,
  },
  infoList: {
    width: "100%",
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  settingsRoot: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: colors.bg,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    shadowColor: "#0B1F5C",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  statusBox: {
    marginTop: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.blue,
  },
});
