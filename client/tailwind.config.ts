import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
			'primary-lime': '#b3d249',
			'primary-purple': '#c622cb',
  			'primary-background': '#FFFFFF',
  			'primary-text': '#3D3929',
  			'primary-button': '#BA5B38',
  			lavender: '#FEC5FB',
  			'link-lime': '#0AE448',
  			'link-orenge': '#FF8709',
  			'primary-dark-text': '#FFFCE1',
  			'paragraph-dark': '#BBBAA6',
  			'primary-dart-background': '#0E100F',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			Copernicus: ["Copernicus"],
  			Charter: ["Charter"],
  			Mori: ["Mori-Regular"],
  			MoriSemiBold: ["Mori-SemiBold"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;


























// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       colors: {
//         // "primary-background": "#EFEDE3",
//         "primary-background": "#FFFFFF",
//         "primary-text": "#3D3929",
//         "primary-button": "#BA5B38",
//         lavender: "#FEC5FB",

//         // gsap color code
//         "link-lime": "#0AE448",
//         "link-orenge": "#FF8709",
//         "primary-dark-text": "#FFFCE1",
//         "paragraph-dark": "#BBBAA6",
//         "primary-dart-background": "#0E100F",
//       },
//       fontFamily: {
//         Copernicus: ["Copernicus"],
//         Charter: ["Charter"],
//         Mori: ["Mori-Regular"],
//         MoriSemiBold: ["Mori-SemiBold"],
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;
