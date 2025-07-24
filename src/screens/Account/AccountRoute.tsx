import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { UserInfoDialog } from "../../components/ui/user-dialog";
import { User } from "../../models/user";
import { ResetPasswordScreen } from "../Auth/Authentication";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/user-slice";
import { useLanguage } from "../../contexts/language-context";

type AccountRouteProps = {
  user: User;
};

const AccountRoute: React.FC<AccountRouteProps> = React.memo(({ user }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
    const { language, toggleLanguage, t } = useLanguage();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();


  const getLanguageText = () => {
    return language === "en" ? "English" : "Tiếng Việt";
  }
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>{t('welcome')},</Text>
        <Text style={styles.username}>{user ? user.Username : ''}</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => setShowDialog(true)}
        >
          <Text style={styles.itemText}>📄 {t('changeLanguage')}</Text>
        </TouchableOpacity>
        <UserInfoDialog
          visible={showDialog}
          onClose={() => setShowDialog(false)}
          user={user}
        />

        <View style={styles.item}>
          <Text style={styles.itemText}>🔔 {t('notification')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChangePassword', { email: user.Email })}>
          <Text style={styles.itemText}>🔑 {t('changePassword')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>📧 {t('contactUs')}</Text>
        </TouchableOpacity>

       <TouchableOpacity style={styles.item} onPress={toggleLanguage}>
          <Text style={styles.itemText}>🌐 {t('changeLanguage')}</Text>
          <Text style={styles.languageText}>{language === 'en' ? t('english') : t('vietnamese')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>📜 {t('privacyPolicy')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOut} onPress={() => handleLogout()}>
        <Text style={styles.signOutText}>{t('signOut')}</Text>
      </TouchableOpacity>
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    width: "100%",
    backgroundColor: "#3b82f6",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    color: "#fff",
    fontSize: 18,
  },
  username: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    alignSelf: "center",
    marginTop: 20,
    width: "90%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  languageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3b82f6",
  },
  signOut: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default AccountRoute;
