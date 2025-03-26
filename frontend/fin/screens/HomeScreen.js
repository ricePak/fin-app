import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BalanceOverview from '../components/BalanceOverview';
import TransactionSummary from '../components/TransactionSummary';


export default function HomeScreen() {
  return (
    <SafeAreaView>
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5, height: 1000 }}>
          <BalanceOverview balance={1162311.33} />
          <TransactionSummary />
        </ScrollView>
    </SafeAreaView>
  );
}