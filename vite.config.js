import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from "autoprefixer";
import * as path from "node:path";
export default defineConfig(function (_a) {
    var command = _a.command;
    var base = command === 'build' ? '/to-webp-converter-client/' : '/';
    return {
        plugins: [vue()],
        css: {
            postcss: {
                plugins: [autoprefixer],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: "@import \"src/assets/css/variables.scss\";",
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        base: base
    };
});
