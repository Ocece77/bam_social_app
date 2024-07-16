import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv ,  ConfigEnv, UserConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ command  , mode }: ConfigEnv): UserConfig =>  {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_KEY,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    define: {
      'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  });
};