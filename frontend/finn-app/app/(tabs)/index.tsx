import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TimeSlider from '@/components/ui/TimeSlider';
import Trendline from '@/components/ui/BankBalance';

import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [timeInterval, setTimeInterval] = useState<String>("1Y");

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', padding: 5, paddingBottom: 32, backgroundColor: '#D3D3D3', gap: 16, width: '100%' }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, gap: 16 }}
        showsVerticalScrollIndicator={false} // Optional: Hide scrollbar
      >
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontSize: 20 }}>Your balance</Text>
          <Text style={{ fontSize: 36, fontWeight: 'bold' }}>$1,162,000.86</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 52, width: '100%' }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Income</Text>
            <Text>$1,462,000.86</Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Expenses</Text>
            <Text>$1,462,000.86</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: '#006400', minWidth: 80, borderRadius: 8, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 40, color: '#006400' }}>+</Text>
          </View>
          <View style={{ borderWidth: 2, borderColor: '#006400', borderRadius: 8, minWidth: 80, paddingHorizontal: 20, backgroundColor: '#003649', position: 'relative' }}>
            <Text style={{ fontSize: 9, color: '#FFFFFF', position: 'absolute', top: 4, left: 4 }}>Visa</Text>
            <Text style={{ fontSize: 9, color: '#FFFFFF', position: 'absolute', bottom: 4, right: 4, width: 50, textAlign: 'right' }}>***3834</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: 'transparent', borderRadius: 8, flexDirection: 'column', alignItems: 'center', padding: 12 }}>
          <TimeSlider selected={timeInterval} onPress={(timeInterval) => setTimeInterval(timeInterval)} />
          <Trendline selected={timeInterval}/>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: 'transparent', borderRadius: 8, flexDirection: 'column', padding: 12, gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 20 }}>Health expenses</Text>
              <Text>Budgeted: $100,000.00</Text>
              <Text>Actual: <Text style={{ color: '#006400' }}>$2,465.96</Text></Text>
            </View>
            <MaterialCommunityIcon style={{ paddingBottom: 1 }} name="dots-horizontal" size={30} color="black" />
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 20 }}>Food expenses</Text>
              <Text>Budgeted: $50,000.00</Text>
              <Text>Actual: <Text style={{ color: '#FF0000' }}>$65,937.88</Text></Text>
            </View>
            <MaterialCommunityIcon style={{ paddingBottom: 1 }} name="dots-horizontal" size={30} color="black" />
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 20 }}>Skincare expenses</Text>
              <Text>Budgeted: $5,000.00</Text>
              <Text>Actual: <Text style={{ color: '#006400' }}>$4397.35</Text></Text>
            </View>
            <MaterialCommunityIcon style={{ paddingBottom: 1 }} name="dots-horizontal" size={30} color="black" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}
