import { create } from 'storybook-prebuilt/theming/create.js';


let myTheme = create({
  base: 'light',
  fontBase: 'Roboto, "Noto Sans SC", sans-serif',

  brandTitle: 'OBAP Elements',
  brandUrl: 'https://github.com/openbap/obap-elements'
});

export { myTheme }