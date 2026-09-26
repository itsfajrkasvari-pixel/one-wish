import type { Config } from 'tailwindcss';

// Design tokens for ONE WISH — dark, cinematic, premium, mysterious.
// No external fonts: we lean on the system's own serif/sans stacks so the
// bundle stays small and the app fully works offline.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#07070B',
          900: '#0A0A12',
          800: '#121220',
          700: '#1A1A2C',
          600: '#26263C'
        },
        wish: {
          gold: '#D9B26A',
          amber: '#E8C468',
          deep: '#8B6B2E'
        },
        ember: {
          DEFAULT: '#B5462F',
          soft: '#C97A5E'
        },
        mist: {
          DEFAULT: '#EFEAE0',
          dim: '#B8B3AA',
          faint: '#7A7670'
        },
        curse: {
          DEFAULT: '#5B3A73',
          soft: '#7C5B96'
        }
      },
      fontFamily: {
        display: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Georgia', 'ui-serif', 'serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(217, 178, 106, 0.35)',
        card: '0 20px 60px -20px rgba(0,0,0,0.6)'
      },
      borderRadius: {
        card: '1.25rem'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        drift: 'drift 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config;
