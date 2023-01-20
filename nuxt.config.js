const axios = require('axios');
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'referees',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/c/font_432132_u2tqr30e3c.css' }
    ]
  },
  ssr: true,
  server: {
    port: 82, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css','~assets/css/reset.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios', // 拦截器
    { src: '@/plugins/fun.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  proxy: {
    //本地调试开启代理  线上用不上  可以不用管  （静态化需要注释）
    "/user": {
      target: "http://127.0.0.1:3000",
      changeOrigin: true, //是否跨域
      secure: false,
      pathRewrite: {
        '^/user': '', // 把 /api 替换成 /
      }
    }
  },
  axios: {
    // 静态化需要注释
    baseURL: "http://127.0.0.1:3000",  // 必须要改成对应域名
    proxy: process.env.NODE_ENV !== 'production',
    credentials: false // 表示跨域请求时是否需要使用凭证
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios'
  ],
  styleResources: {
    scss: [
      './assets/css/variables.scss', // 全局 scss 变量
      './assets/css/mixins.scss' // 全局 scss 混合
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    postcss: false,
  }
}
