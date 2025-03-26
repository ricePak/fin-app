import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

import AddCardIcon from '../../assets/icons/addcard.svg';
import Visa1 from '../../assets/icons/visa1.svg';

const formatBalance = (balance) => {
  return balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const BalanceDisplay = ({ balance }) => {

  const [ visible, setVisible ] = useState(true);

  const formatRedactedBalance = (balance) => {
    return String(balance).replace(/\d|./g, ' •');
  }

  return (
    <View style={{  width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{fontFamily: "UrbanistSemiBold", fontSize: 50, marginRight: 10}}>
        {visible ? `$${formatBalance(balance)}` : `$${formatRedactedBalance(balance)}`}
      </Text>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Ionicons name={visible ? 'eye' : 'eye-off'} size={24} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
}

const IncomeExpenseOverview = ({ income, expense }) => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#6D8B76", paddingBottom: 10 }}>
      <View style={{ width: '50%' }}>
        <Text style={[FONTS.bold, { color: COLORS.black, marginBottom: 5 }]}>Income</Text>
        <Text style={[FONTS.regular, { color: COLORS.green }]}>${formatBalance(income)}</Text>
      </View>
      <View>
        <Text style={[FONTS.bold, { color: COLORS.black, marginBottom: 5 }]}>Expense</Text>
        <Text style={[FONTS.regular, { color: COLORS.red }]}>${formatBalance(expense)}</Text>
      </View>
    </View>
  );
}

const CardScroller = ({ cardnum }) => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <AddCardIcon width={80} height={50} />
      <View style={[ SHADOWS.lg,  { width: 100, marginLeft: 10}]}>
        <Visa1 width={80} height={50} />
        <Text style={[FONTS.regular, { color: COLORS.white, marginLeft: 28, marginTop: 30  , position: 'absolute', fontSize: 10,}]}>•••• {cardnum}</Text>
      </View>
    </View>
  );
}

export default function BalanceOverview({ balance }) {
  const [ visible, setVisible ] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%', alignItems: 'flex-start' }}>
        <Text style={[FONTS.regular]}>Balance Overview</Text>
      </View>
      <BalanceDisplay balance={balance} />
      <IncomeExpenseOverview income={balance} expense={balance} />
      <CardScroller cardnum={4412} />
    </View>
  );
}