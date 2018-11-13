module.exports = {
  /*
  ** Headers of the page
  https://server-joyjhhzylx.now.sh 'now URL'
  https://polar-basin-51538.herokuapp.com 'heroku'

  */
  head: {
    title: 'Save App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Save App' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  manifest: {
    "short_name": "SaveApp",
    "name": "Save Money App",
    "display": "standalone",
  },
  mode: 'spa',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', {
      id: 'UA-127160311-1'
    }]
  ],
  router: {
    middleware: ['auth']
  },
  axios: {
    // baseURL: 'http://127.0.0.1:3001/v1'
    baseURL: 'https://polar-basin-51538.herokuapp.com/v1'
  },
  plugins: [
    '~/plugins/vue2-filters',
  ],
  css: [
    '@/assets/css/pure-min.css',
    '@/assets/css/main.scss'
  ],
  redirect: {
    home: "/",  //redirection after logged in
    login: "/login",        //redirection if user is not logged in
    logout: "/",            //redirection after user has logged out
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          // login: { url: 'http://localhost:3001/v1/users/login', method: 'post', propertyName: 'token' },
          login: { url: 'https://polar-basin-51538.herokuapp.com/v1/users/login', method: 'post', propertyName: 'token' },
          logout: false,
          // user: { url: 'http://localhost:3001/v1/users', method: 'get', propertyName: 'user' }
          user: { url: 'https://polar-basin-51538.herokuapp.com/v1/users', method: 'get', propertyName: 'user' }
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
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    },
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

