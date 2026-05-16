import { atom } from 'recoil'

export enum ThemeFlag {
  light = 'light',
  dark = 'dark',
}

export const themeState = atom<ThemeFlag>({
  key: 'THEME_STATE',
  default: ThemeFlag.dark,
})