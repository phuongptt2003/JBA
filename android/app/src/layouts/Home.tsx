import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { SceneMap, TabView } from 'react-native-tab-view';
import HistoryRoute from './History/HistoryRoute';
import AccountRoute from './Account/AccountRoute';
import TabNavigator from '../navigation/TabNavigator';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const ScanRoute = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Scan Tab</Text>
  </View>
);

const HomeScreen: React.FC<Props> = ({ route }) => {
  const email = route.params.email;
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <View style={styles.container}>
      <TabNavigator user={user} />
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
