import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        nabataean: {
          sandstone: '#F4A460',
          bronze: '#CD7F32',
          night: '#2F1B14'
        }
      }
    }
  },
  plugins: []
}

export default config
