
import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AccountRoute from '../screens/Account/AccountRoute';
import HistoryRoute from '../screens/History/HistoryRoute';
import { ScanRoute } from '../screens/Scan/ScanRoute';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { User } from '../models/user';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ user }: { user: User }) => {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen
                name="History"
                component={HistoryRoute}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="time-outline"
                            size={24}
                            color={focused ? '#007AFF' : '#888888'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan"
                component={ScanRoute}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="scan-outline"
                            size={24}
                            color={focused ? '#007AFF' : '#888888'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                children={() => <AccountRoute user={user} />}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="person-outline"
                            size={24}
                            color={focused ? '#007AFF' : '#888888'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
