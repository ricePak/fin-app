import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FinChatScreen from '../screens/FinChatScreen';

import { COLORS } from '../constants/theme';

import TabIcon from '../components/TabIcon';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Transactions') iconName = 'transactions';
            else if (route.name === 'Settings') iconName = 'settings';
            else if (route.name === 'Fin') iconName = 'fin';

            return (
              <View style={{
                backgroundColor: focused ? COLORS.lightBlue : 'transparent', // Your circle bg
                borderRadius: 25,
                padding: 10,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TabIcon name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor:  COLORS.green,
          tabBarInactiveTintColor: COLORS.greenFade,
          tabBarStyle: { paddingTop:10, height:80 },
          headerShown: false,
          tabBarShowLabel: false
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Fin" component={FinChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
