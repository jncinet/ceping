import { defineConfig } from '@umijs/max';

export default defineConfig({
  dva: {},
  request: {
    dataField: 'data',
  },
  history: {
    type: 'hash',
  },
  hash: true,
  title: '学业测评',
  proxy: {
    '/json': {
      target: 'https://cp.xiongqi.net.cn/',
      changeOrigin: true,
    },
  },
  routes: [
    { path: '/', component: 'index' },
    { path: '/show/:id', component: 'show' },
  ],

  npmClient: 'yarn',
  tailwindcss: {},
});
