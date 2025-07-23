
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import AccountRoute from '../layouts/Account/AccountRoute';
import HistoryRoute from '../layouts/History/HistoryRoute';
import { ScanRoute } from '../layouts/Home';

const initialLayout = { width: Dimensions.get('window').width };

const TabNavigator = ({ user }: { user: any }) => {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'history', title: 'History' },
        { key: 'scan', title: 'Scan' },
        { key: 'account', title: 'Account' },
    ];

    const renderScene = ({ route }: { route: { key: string } }) => {
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

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
};

export default TabNavigator;
