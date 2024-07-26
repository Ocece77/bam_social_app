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
      'process.env.VITE_API_FIREBASE_API_KEY' : JSON.stringify(env.VITE_API_FIREBASE_API_KEY),
      'process.env.VITE_API_FIREBASE_AUTH_DOMAIN' : JSON.stringify(env.VITE_API_FIREBASE_AUTH_DOMAIN),
      'process.env.VITE_API_FIREBASE_PROJECT_ID' : JSON.stringify(env.VITE_API_FIREBASE_PROJECT_ID),
      'process.env.VITE_API_FIREBASE_STORAGE_BUCKET' : JSON.stringify(env.VITE_API_FIREBASE_STORAGE_BUCKET),
      'process.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID' : JSON.stringify(env.VITE_API_FIREBASE_MESSAGING_SENDER_ID),
      'process.env.VITE_API_FIREBASE_APP_ID' : JSON.stringify(env.VITE_API_FIREBASE_APP_ID),
      'process.env.VITE_API_FIREBASE_MEASUREMENT_ID' : JSON.stringify(env.VITE_API_FIREBASE_MEASUREMENT_ID),
    },
  });
};