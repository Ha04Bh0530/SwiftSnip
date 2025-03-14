/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Catppuccin Mocha (Dark)
        mocha: {
          base: '#1e1e2e',
          surface0: '#313244',
          surface1: '#45475a',
          surface2: '#585b70',
          text: '#cdd6f4',
          subtext1: '#bac2de',
          subtext0: '#a6adc8',
          overlay0: '#6c7086',
          blue: '#89b4fa',
          lavender: '#b4befe',
          sapphire: '#74c7ec',
          sky: '#89dceb',
          teal: '#94e2d5',
          green: '#a6e3a1',
          yellow: '#f9e2af',
          peach: '#fab387',
          maroon: '#eba0ac',
          red: '#f38ba8',
          mauve: '#cba6f7',
          pink: '#f5c2e7',
          flamingo: '#f2cdcd',
          rosewater: '#f5e0dc'
        },
        // Catppuccin Latte (Light)
        latte: {
          base: '#eff1f5',
          surface0: '#ccd0da',
          surface1: '#bcc0cc',
          surface2: '#acb0be',
          text: '#4c4f69',
          subtext1: '#5c5f77',
          subtext0: '#6c6f85',
          overlay0: '#7c7f93',
          blue: '#1e66f5',
          lavender: '#7287fd',
          sapphire: '#209fb5',
          sky: '#04a5e5',
          teal: '#179299',
          green: '#40a02b',
          yellow: '#df8e1d',
          peach: '#fe640b',
          maroon: '#e64553',
          red: '#d20f39',
          mauve: '#8839ef',
          pink: '#ea76cb',
          flamingo: '#dd7878',
          rosewater: '#dc8a78'
        }
      }
    }
  },
  plugins: []
};