// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const flumensTailwind = require('@flumens/tailwind/tailwind.config.js');
const themeSwapper = require('tailwindcss-theme-swapper');

const secondary = {
  // https://www.tailwindshades.com/#color=37.02127659574467%2C100%2C53.92156862745098&step-up=9&step-down=11&hue-shift=0&name=sun&base-stop=5&v=1&overrides=e30%3D
  DEFAULT: '#FFA514',
  50: '#FFFEFC',
  100: '#FFF7EA',
  200: '#FFEAC6',
  300: '#FFDDA3',
  400: '#FFCF7F',
  500: '#FFC15B',
  600: '#FFB338',
  700: '#FFA514',
  800: '#B26D00',
  900: '#513200',
  950: '#211400',
};

const ppPrimary = {
  // https://www.tailwindshades.com/#color=143.85542168674698%2C100%2C16.274509803921568&step-up=13&step-down=4&hue-shift=-100&name=camarone&base-stop=6&v=1&overrides=e30%3D
  DEFAULT: '#005321',
  50: '#E1FFC1',
  100: '#C9FFA0',
  200: '#89FF5D',
  300: '#32FF1B',
  400: '#00D80E',
  500: '#077420', // manually adjusted one
  600: '#005321',
  700: '#003F23',
  800: '#002A1F',
  900: '#001614',
  950: '#000C0B',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    ...flumensTailwind.plugins,

    themeSwapper({
      themes: [
        // @ts-ignore
        {
          name: 'base',
          selectors: [':root'],
          theme: {
            ...flumensTailwind.theme?.extend,

            colors: {
              primary: {
                // https://www.tailwindshades.com/#color=233.1958762886598%2C44.70046082949309%2C42.54901960784314&step-up=10&step-down=11&hue-shift=0&name=chambray&base-stop=6&v=1&overrides=e30%3D
                DEFAULT: '#3C479D',
                50: '#F6F7FC',
                100: '#E4E5F4',
                200: '#BFC3E6',
                300: '#9AA1D8',
                400: '#757ECA',
                500: '#505CBC',
                600: '#3C479D',
                700: '#2C3574',
                800: '#1D224C',
                900: '#0D1023',
                950: '#06070F',
              },

              secondary,

              success: {
                // https://www.tailwindshades.com/#color=128.25396825396825%2C100%2C32&step-up=8&step-down=11&hue-shift=0&name=fun-green&base-stop=7&v=1&overrides=e30%3D
                DEFAULT: '#00A316',
                50: '#ADFFB9',
                100: '#99FFA7',
                200: '#70FF84',
                300: '#47FF61',
                400: '#1FFF3D',
                500: '#00F522',
                600: '#00CC1C',
                700: '#00A316',
                800: '#006B0F',
                900: '#003307',
                950: '#001703',
              },

              tertiary: {
                // https://www.tailwindshades.com/#color=203.89830508474577%2C100%2C46.27450980392157&step-up=9&step-down=12&hue-shift=0&name=azure-radiance&base-stop=6&v=1&overrides=e30%3D
                DEFAULT: '#008EEC',
                50: '#E9F6FF',
                100: '#D3EDFF',
                200: '#A5DBFF',
                300: '#77C9FF',
                400: '#49B6FF',
                500: '#1BA4FF',
                600: '#008EEC',
                700: '#0069AF',
                800: '#004472',
                900: '#002034',
                950: '#000D16',
              },

              warning: secondary,

              danger: {
                // https://www.tailwindshades.com/#color=0%2C85.36585365853658%2C59.80392156862745&step-up=8&step-down=11&hue-shift=0&name=flamingo&base-stop=5&v=1&overrides=e30%3D
                DEFAULT: '#F04141',
                50: '#FDEBEB',
                100: '#FCD8D8',
                200: '#F9B2B2',
                300: '#F68D8D',
                400: '#F36767',
                500: '#F04141',
                600: '#E71212',
                700: '#B30E0E',
                800: '#7F0A0A',
                900: '#4B0606',
                950: '#310404',
              },
            },
          },
        },
        {
          name: 'pp',
          selectors: ['[data-theme="pp"]'],
          theme: {
            ...flumensTailwind.theme?.extend,

            colors: {
              primary: ppPrimary,
            },
          },
        },
      ],
    }),
  ],
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@flumens/ionic/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/@flumens/tailwind/dist/**/*.{js,ts,jsx,tsx}',
  ],
};
