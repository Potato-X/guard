import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base:'/guard',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
  esbuild:{
    pure:["console.log"], //移除所有的log打印
    legalComments:"none" //打包时移除所有的注释
  },
  build:{
    rollupOptions:{
      output:{
        manualChunks:{
          vue:["vue",'vue-router',"pinia"],
          element:["element-plus","@element-plus/icons-vue"]
        }
      }
    }
  }
});
