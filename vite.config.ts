import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import autoprefixer from "autoprefixer";
import * as path from "node:path";

export default defineConfig(({command}) => {
    const base = command === 'build' ? '/to-webp-converter-client/' : '/'
    return {
        plugins: [vue()],
        css: {
            postcss: {
                plugins: [autoprefixer],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "src/assets/css/variables.scss";`,
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        base
    }
})
