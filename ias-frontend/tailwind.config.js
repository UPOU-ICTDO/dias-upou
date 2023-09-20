module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            fontSize: {
                '2.5xl':['27px', '34px']
            },
            fontFamily: {
                montserrat: ['Montserrat'],
                inter: ['Inter'],
                poppins: ['Poppins'],
            },
            colors: {
                'primary-red': '#811b24',
                'secondary-red': '#9e3636',
                'sidebar-text': '#e5e5e5',
                'highlight': '#fdf384',
                'primary-btn': '#2a7146',
                'primary-btn-hover': '#368857',
                'secondary-btn': '#7b7b7b',
                'secondary-btn-hover': '#939393',
                'btn-text': '#f7fbff',
                'category-bg': '#fafafa',
                'light-blue': '#e2ecfb',
                'dark-blue': '#08356d',
                'table-hover-color': '#faffd8'
            },
            screens: {
                'fhd':'1920px'
            },
        },
    },
    plugins: [],
}
