/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"], // Enable dark mode using a class
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        fontFamily: {
          sans: ['Comic Neue', 'sans-serif'], // Default body font
          heading: ['Bangers', 'cursive'], // Comic-style heading font
        },
        colors: {
          // "Adam West Batman" / Comic Book Palette
          'mojo-blue': {
            DEFAULT: '#0052CC', // Hero Blue
            light: '#4C8DFF',
            dark: '#003A99',
          },
          'mojo-red': {
            DEFAULT: '#D92E2E', // Dynamic Red (slightly less orange than FF4136 for better contrast)
            light: '#FF5C5C',
            dark: '#B02424',
          },
          'mojo-yellow': {
            DEFAULT: '#FFDC00', // POW! Yellow
            light: '#FFEE55',
            dark: '#CCA700',
          },
          'mojo-green': { // For variety, like a villain's accent
            DEFAULT: '#00A36C',
            light: '#33B88F',
            dark: '#007A50',
          },
          'mojo-purple': { // Another accent
            DEFAULT: '#7B2CBF',
            light: '#9E57D9',
            dark: '#5A1F8C',
          },
          'comic-bg': '#F8F8F0', // Off-white comic page background
          'comic-ink': '#222222', // Dark ink color for text
          'comic-panel': '#E0E0D8', // Lighter panel color for contrast
  
          // ShadCN UI theming (can be customized further)
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))", // Will be comic-bg in light mode
          foreground: "hsl(var(--foreground))", // Will be comic-ink in light mode
          primary: {
            DEFAULT: "hsl(var(--primary))", // e.g., mojo-blue
            foreground: "hsl(var(--primary-foreground))", // e.g., white/light color
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))", // e.g., mojo-red
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))", // e.g., mojo-red
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))", // e.g., mojo-yellow
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
          'comic-bubble': '1.5rem', // For chat bubbles
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "pow-effect": { // Example animation for emphasis
            '0%, 100%': { transform: 'scale(1)', opacity: '1' },
            '50%': { transform: 'scale(1.5)', opacity: '0.7' },
          }
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "pow": "pow-effect 0.3s ease-out forwards",
        },
        boxShadow: {
          'comic-strong': '4px 4px 0px 0px rgba(0,0,0,0.75)', // Strong comic-style shadow
          'comic-soft': '2px 2px 0px 0px rgba(0,0,0,0.5)',
        }
      },
    },
    plugins: [require("tailwindcss-animate")],
  }