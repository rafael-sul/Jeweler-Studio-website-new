/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian:   '#08090D',
        graphite:   '#13151C',
        'graphite-2':'#181B24',
        hairline:   '#1E212A',
        'hairline-2':'#262A35',
        ice:        '#F5F6F8',
        smoke:      '#8A8E98',
        'smoke-2':  '#5C6068',
        champagne:  '#D4B87A',
        // Light-mode tokens — used after TrustedBy
        paper:      '#F5F6FA',
        'paper-2':  '#FFFFFF',
        'paper-3':  '#FAFBFD',
        ink:        '#0A0B14',
        'ink-2':    '#1A1F2E',
        'ink-3':    '#3A3F4D',
        'ink-mute': '#6B7080',
        'ink-faint':'#9CA0AC',
        rule:       '#E8EAEE',
        'rule-2':   '#D6D9E0',
        aurora: {
          cyan:   '#6DD5FA',
          violet: '#B298FF',
          iris:   '#E0E7FF',
        },
        ok:  '#6BD3A3',
        bad: '#E87A6D',
      },
      fontFamily: {
        sans:  ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:  ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', '"New York"', '"Times New Roman"', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        tight:    '-0.015em',
        label:    '0.1em',
        eyebrow:  '0.14em',
        grp:      '0.16em',
      },
      animation: {
        'ambient':   'ambient 28s ease-in-out infinite alternate',
        'sweep':     'sweep 18s linear infinite',
        'sweep-2':   'sweep2 24s linear infinite',
        'drift':     'drift 22s ease-in-out infinite alternate',
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
        'rise':      'rise 0.7s cubic-bezier(0.2,0.8,0.2,1) both',
        'fade-in':   'fadeIn 0.9s ease both',
      },
      keyframes: {
        ambient: {
          '0%':   { transform: 'translate(0%, 0%)   scale(1)',   opacity: '0.9' },
          '100%': { transform: 'translate(4%, -3%)  scale(1.1)', opacity: '1'   },
        },
        sweep: {
          '0%':   { transform: 'translate(-20%, -10%) rotate(0deg)'  },
          '100%': { transform: 'translate(-20%, -10%) rotate(360deg)' },
        },
        sweep2: {
          '0%':   { transform: 'translate(10%, 20%) rotate(360deg)' },
          '100%': { transform: 'translate(10%, 20%) rotate(0deg)'   },
        },
        drift: {
          '0%':   { backgroundPosition: '0% 0%, 100% 100%, 0 0' },
          '100%': { backgroundPosition: '20% 10%, 80% 90%, 0 0' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)'   },
          '50%':       { opacity: '0.4', transform: 'scale(1.3)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)'   },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
