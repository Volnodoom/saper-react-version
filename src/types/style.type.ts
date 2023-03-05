import { defaultTheme } from "themes/default-theme";

export type DefaultThemeParametersType = {
  [P in keyof typeof defaultTheme]: typeof defaultTheme[P]
};

export type ThemeParametersType = {
  theme: DefaultThemeParametersType,
};


