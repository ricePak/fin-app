/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000';
const tintColorDark = '#fff';

export const ColorPalette = {
  "dark-green": "#0B7029", 
  "light-green": "#6D8B76", 
  "light-grey": "#F8F8F8",
  "dark-blue": "#003649",
  "red": "#FF0000",
  "grey": "#808080"
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#dddddd',
    tabIconSelected: tintColorLight,
    tabBarBg: '#0BC026'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tabBarBg: '#0BC026'
  },
};
