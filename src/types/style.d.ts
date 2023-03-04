import 'styled-components';
import { DefaultThemeParametersType } from './style.type';

declare module 'styled-components' {
  export interface DefaultTheme extends DefaultThemeParametersType {}
}

