import { View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: "#fff", // Change color dynamically
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    />
  );
}

//export default undefined;


export function useBottomTabOverflow() {
  return 0;
}
