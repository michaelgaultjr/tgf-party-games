import HMR from '@roxi/routify/hmr'
import App from './App.svelte';

declare global {
  interface Window {
    gtag: (type: string, name: string, settings?: Record<string, string | number | boolean>) => void
  }
}

const app = HMR(App, { target: document.body }, 'routify-app')

export default app;