import { useState } from "react";
import { Appearance } from "react-native";

export const IconName = {
  name: 'check-circle',
  check: 'check',
};

export const ColorTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme);
  console.log('theme', theme);
  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });
};
