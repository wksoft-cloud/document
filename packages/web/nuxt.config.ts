// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    ssr: false,
    modules: [
        '@pinia/nuxt',
        '@element-plus/nuxt'
    ],
    css: [
        '~/assets/css/tailwind.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    }
    // elementPlus: {},
})
