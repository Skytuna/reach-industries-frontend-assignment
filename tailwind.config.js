/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-100': '#1192D4',
                'primary-200': '#0076BE',
                'primary-300': '#000E37',
                gray: '#575556',
                black: '#000000',
                white: '#FFFFFF',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
