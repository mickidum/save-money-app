module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Smoke and Save',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Smoke and save app' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  router: {
    middleware: ['auth']
  },
  axios: {
    baseURL: 'http://127.0.0.1:3001/v1'
  },
  css: [
    '@/assets/css/pure-min.css',
    '@/assets/css/main.scss'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'http://localhost:3001/v1/users/login', method: 'post', propertyName: 'token' },
          logout: { url: '/', method: 'get' },
          user: { url: 'http://localhost:3001/v1/users', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: 'bearer', 
      }
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

