import HMR from '@roxi/routify/hmr'
import App from './App.svelte';

declare global {
  interface Window {
    plausible: (event: string, settings?:{
      callback?: CallableFunction,
      props?: any
    }) => void
  }
}

const app = HMR(App, { target: document.body }, 'routify-app')

export default app;