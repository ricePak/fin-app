import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';


export default function TransactionsScreen() {
  
  const styles = StyleSheet.create({
    default: { fontSize: 20,  width:100, height: 50, justifyContent: 'center', alignItems: 'center',},
    selected: {backgroundColor: COLORS.lightBlue, borderBottomColor: COLORS.green, borderBottomWidth: 2,},
  });

  const getImage = (scale) => {
    switch (scale) {
        case 'Daily': return require('../assets/demo_pics/transactions/daily.png');
        case 'Calendar': return require('../assets/demo_pics/transactions/calendar.png');
        case 'Budget': return require('../assets/demo_pics/transactions/budget.png');
        default: return require('../assets/demo_pics/transactions/daily.png');
    };
};
  

  const insets = useSafeAreaInsets();

  const [ tab, setTab ] = React.useState('Daily'); 

  return (
    <View>
      <View style={[
        SHADOWS.lg,
        FONTS.regular,
        {
          paddingTop: insets.top + 10,
          backgroundColor: COLORS.white,
        }
      ]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Text style={{marginRight: 30, fontSize: 20,}}>&lt;</Text>
          <Text style={{ fontSize: 22,}}>March 2025</Text>
          <Text style={{marginLeft: 30, fontSize: 20,}}>&gt;</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 50,
          marginTop: 15,
          borderTopColor: COLORS.greenFade,
          borderTopWidth: 1,
          }}>
            <TouchableOpacity onPress={() => setTab('Daily')} style={[styles.default, {marginLeft: 20,}, tab === 'Daily' && styles.selected]}>
              <Text style={{fontSize: 20,}} >Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab('Calendar')} style={[styles.default, tab === 'Calendar' && styles.selected]}>
              <Text style={{fontSize: 20,}} >Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab('Budget')} style={[styles.default, {marginRight: 20,}, tab === 'Budget' && styles.selected]}>
              <Text style={{fontSize: 20,}} >Budget</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop:50, justifyContent: 'center', alignItems: 'center',}}>
      <Image source={getImage(tab)} style={{ width: '90%',}} />
      </View>
    </View>
  );
}