import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ColorPalette } from '@/constants/Colors';

export default function TabTwoScreen() {
    type HeaderOption = "Daily" | "Calendar" | "Budget";

    const [monthYear, setMonthYear] = useState<String>("April 2025");
    const [header, setHeader] = useState<HeaderOption>("Daily");

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', padding: 5, paddingBottom: 32, backgroundColor: '#F8F8F8', gap: 16, width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingLeft: 24, paddingRight: 24 }}>
                <MaterialIcon name="arrow-back-ios" size={24} color="#000" />
                <Text>April 2025</Text>
                <MaterialIcon name="arrow-forward-ios" size={24} color="#000" />
              </View>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                gap: 16, 
                borderTopWidth: 1,
                paddingLeft: 24, 
                paddingRight: 24, 
                shadowColor: '#000', 
                shadowOpacity: 0.1, 
                shadowRadius: 4, 
                shadowOffset: { width: 0, height: 2 }, // Adjusted shadow offset to remove shadow with the top
                elevation: 3, // For Android shadow
                backgroundColor: '#fff', // Ensure background color for shadow visibility
              }}>
                <Text 
                  style={{ 
                    color: header === "Daily" ? ColorPalette['dark-green'] : ColorPalette['grey'], 
                    paddingVertical: 16, // Increase vertical padding for larger pressable area
                    fontSize: 16 // Optional: Adjust font size for better visibility
                  }}
                  onPress={() => setHeader("Daily")}
                >
                  Daily
                </Text>
                <Text 
                  style={{ 
                    color: header === "Calendar" ? ColorPalette['dark-green'] : ColorPalette['grey'], 
                    paddingVertical: 16, // Increase vertical padding for larger pressable area
                    fontSize: 16 // Optional: Adjust font size for better visibility
                  }}
                  onPress={() => setHeader("Calendar")}
                >
                  Calendar
                </Text>
                <Text 
                  style={{ 
                    color: header === "Budget" ? ColorPalette['dark-green'] : ColorPalette['grey'], 
                    paddingVertical: 16, // Increase vertical padding for larger pressable area
                    fontSize: 16 // Optional: Adjust font size for better visibility
                  }}
                  onPress={() => setHeader("Budget")}
                >
                  Budget
                </Text>
              </View>
              <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 24, gap: 16, flexDirection: 'row', alignItems: 'flex-start' }}
                showsVerticalScrollIndicator={false} // Optional: Hide scrollbar
              >
                {header === "Daily" ? <Image source={require('../../assets/images/daily.png')} style={{
                    width: 800, // Adjusted width
                    height: 800, // Adjusted height
                    resizeMode: 'contain', // Scale image properly
                    marginLeft: -270, // Translate the image left
                    marginRight: 16, // Add spacing to the right of the image for the text
                }} /> : 
                header === "Calendar" ? <Image source={require('../../assets/images/calendar.png')} style={{
                    width: 480, // Adjusted width
                    height: 480, // Adjusted height
                    resizeMode: 'contain', // Scale image properly
                    marginLeft: -110, // Translate the image left
                    // Translate the image up
                    marginTop: -50, // Adjusted margin to move the image upwards
                }} /> : <Image source={require('../../assets/images/budget.png')} style={{
                    width: 300, // Adjusted width
                    height: 300, // Adjusted height
                    resizeMode: 'contain', // Scale image properly
                    marginLeft: -20, // Translate the image left
                    marginRight: 0, // Add spacing to the right of the image for the text
                }} />}
              </ScrollView>
        </SafeAreaView>
          );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
