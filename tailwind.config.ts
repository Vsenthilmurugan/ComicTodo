import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'comic-cover':"url('/comiccover.jpg')"
      },
      fontFamily:{
       comic:['Comic Neue', "cursive"],
       galindo: ['Galindo', "sans-serif"],
       weather:['Merriweather', "serif"]
      },
      colors:{
        'bg-mickey':'#d4de96',
        'bg-avengers':'#f56969',
        'bg-frozen':'#679EF3'
      },
    },
  },
  plugins: [],
}
export default config
