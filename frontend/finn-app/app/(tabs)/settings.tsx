import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', padding: 5, paddingBottom: 32, backgroundColor: '#F8F8F8', gap: 16, width: '100%' }}>
        <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, gap: 16, flexDirection: 'column', justifyContent: 'center' }}
        showsVerticalScrollIndicator={false} // Optional: Hide scrollbar
        >
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Settings</Text>
            <Image source={require('../../assets/images/settings.png')} style={{
            width: 450, // Adjusted width
            height: 450, // Adjusted height
            resizeMode: 'contain', // Scale image properly
            marginLeft: -90, // Translate the image left
            marginRight: 0, // Add spacing to the right of the image for the text
            }} />
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
