import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { SceneMap, TabView } from 'react-native-tab-view';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type AccountRouteProps = {
  user?: {
    Username?: string;
    [key: string]: any;
  };
};

const AccountRoute: React.FC<AccountRouteProps> = React.memo(({ user }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.username}>{user ? user.Username : ''}</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>📄 Personal information</Text>
        </TouchableOpacity>

        <View style={styles.item}>
          <Text style={styles.itemText}>🔔 Notification</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>🔑 Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>📧 Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>📜 Privacy policy</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity> */}
    </View>
  );
});

const ScanRoute = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Scan Tab</Text>
  </View>
);

const HistoryRoute = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>History Tab</Text>
  </View>
);

const renderScene = ({ route }: { route: { key: string } }, user: any) => {
  switch (route.key) {
    case 'history':
      return <HistoryRoute />;
    case 'scan':
      return <ScanRoute />;
    case 'account':
      return <AccountRoute user={user} />;
    default:
      return null;
  }
};

const routes = [
  { key: 'history', title: 'History' },
  { key: 'scan', title: 'Scan' },
  { key: 'account', title: 'Account' },
];

const HomeScreen: React.FC<Props> = ({ route }) => {
  const email = route.params.email;
  const user = useSelector((state: RootState) => state.user.currentUser);

  const [index, setIndex] = React.useState(0);
  const layout = { width: Dimensions.get('window').width };
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={props => renderScene(props, user)}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ flex: 1 }}
      />
      {/* <Text style={styles.text}>
        Welcome to Home {user ? user.Username : ''}
      </Text> */}
    </View>
  );
};

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
  
});

export default HomeScreen;
