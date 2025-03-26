import { StyleSheet } from "react-native";

const COLORS = {
    green: '#0B7029',
    lightGreen: '#0BC026',
    background: '#F8F8F8',
    white: '#FFFFFF',
    blue: '#003649',
    black: '#000000',
    lightBlue: '#E8F1F2',
    greenFade: '#6D8B76',
    red: '#803233',
    lightRed: '#A94142',
  };

  const FONTS = StyleSheet.create({
    regular: {
      fontFamily: 'InterRegular',
      fontSize: 18,
    },
    bold: {
      fontFamily: 'InterBold',
      fontSize: 16,
    },
  });

  const SHADOWS = {
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8, // for Android
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 4, // for Android
    }
  };
  
  export { COLORS, FONTS, SHADOWS };