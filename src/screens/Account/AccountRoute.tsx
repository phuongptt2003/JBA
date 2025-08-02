import React, { useEffect } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { UserInfoDialog } from "../../components/ui/user-dialog";
import { User } from "../../models/user";
import { ResetPasswordScreen } from "../Auth/Authentication";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useDispatch } from "react-redux";
import { logoutStore } from "../../store/slices/user-slice";
import { useLanguage } from "../../contexts/language-context";
import { logoutUser, switchEmailNotification } from "../../api/user-api";
import { getToken } from "../../utils/token-storage";

type AccountRouteProps = {
  user: User;
};

const AccountRoute: React.FC<AccountRouteProps> = React.memo(({ user }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { changeLanguage: changeLanguageApi } = require("../../api/user-api");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const getLanguageText = () => {
    return language === "en" ? "English" : "Tiếng Việt";
  }
  const handleLogout = async () => {
    dispatch(logoutStore());

    navigation.navigate('Login');
  }

  const handleToggleNotification = async (value: boolean) => {
    if (value) {
      try {
        setNotificationsEnabled(true);
        const res = await switchEmailNotification();
        const enabled = res?.isSubscription?.emailNotificationsEnabled ?? false;
      } catch (error) {
        console.error('Toggle notification error:', error);
      }
    } else {
      setNotificationsEnabled(false);
    }
  };


  const handleChangeLanguage = async () => {
    const nextLanguage = language === 'en' ? 'vn' : 'en';
    if (nextLanguage === 'vn') {
      try {
        await changeLanguageApi('vn');
      } catch (error) {
        console.error('Change language API error:', error);
      }
    }
    toggleLanguage();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>{t('welcome')},</Text>
        <Text style={styles.username}>{user ? user.username : ''}</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('EditProfile', { user })}
        >
          <Text style={styles.itemText}>📄 {t('personalInfo')}</Text>
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
            onValueChange={handleToggleNotification}
          />
        </View>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChangePassword', { email: user.email })}>
          <Text style={styles.itemText}>🔑 {t('changePassword')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>📧 {t('contactUs')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleChangeLanguage}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    width: "95%",
    backgroundColor: "#efd7e5ff",
    paddingVertical: 50,
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    color: "black",
    fontSize: 18,
  },
  username: {
    color: "black",
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
    backgroundColor: "#f65f5fff",
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
