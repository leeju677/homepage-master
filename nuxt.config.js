export default {
  // loading: "~/components/loading.vue",
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "BEEABLE CMS"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  router: {
    // linkExactActiveClass: 'active'
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/app.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/index.js', ssr: false },
    '~/plugins/beeable.js',
    '~/plugins/fakeauth.js',
    "~/plugins/fireauth.js",
    "~/plugins/simplebar.js",
    "~/plugins/user-menu.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vuelidate.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/vue-mask.js",
    "~/plugins/vue-googlemap.js",
    "~/plugins/vue-toast.js"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/moment',
  ],
  moment: {
    locales: ['ko']
  },  
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
    'vue-daum-postcode/nuxt',
    ['nuxt-highlightjs', {
      style: 'nord' //'dark' //'obsidian' //'vs2015' //
    }]
  ],
  axios: {
    // 모듈 설정
    baseURL: process.env.API_URL || '',
    browserBaseURL: process.env.API_URL_BROWSER || process.env.API_URL,
    host: process.env.API_HOST || "",
    port: process.env.API_PORT || "8080",
    prefix: process.env.API_PREFIX || "/",
    credentials: true,
    debug: false || process.env.DEBUG_MODE,
    retry: {
      retries: 4, // 최대 재전송 횟수 4회
      shouldResetTimeout: true, // 재전송 간 타임아웃을 리셋하기
      retryDelay: (retry) => {
        return retry * 100; // 재전송 횟수 * 0.1초만큼 재전송 시작 시간을 지연시키기
      },
      retryCondition: (error) => err.response.status === 429, // 서버 혼잡이 일어났을 경우에만 재전송하기
    },
    progress: true, // 로딩 바 사용 (default: true)  
  },

  /*
  # Multiple Server 활용하기
  # http://ccambo.github.io/Dev/Nuxt/6.how-to-use-axios-in-nuxt/#google_vignette0
  axios: {
    proxy: true   // default: false, boolean or object 설정 가능
    baseURL: ....
    credenital: true,
    debug: true,
    retry: {
      retries: 3
    },
    requestInterceptor: (config, {stroe}) => {
      config.headers.common['Authentication'] = ...
      config.headers.common["Content-Type'] = ...
      return config
    }
  }
  ...
  proxy: {
    '/api/': {
      target: 'http://your.apiserver.com',
      pathRewrite: { '^/api:': ''},
      chagneOrigin: false,
      prependPath: false
    }
    '/api2/': {
      target: 'http://another.apiserver.com',
      ...
    }
    ...
  }*/

  
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: "6LdmUJ8fAAAAAC4yk-tKghx7x1PDB8IrL8zV6qJs",    // Site key for requests
    version: 3,     // Version
  },
  /**
   * google recaptcha options
   */
  loading: '~/components/widgets/LoadingBar.vue',
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },
  build: {},
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY,
    authdomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseurl: process.env.VUE_APP_DATABASEURL,
    projectid: process.env.VUE_APP_PROJECTId,
    storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    message: process.env.VUE_APP_MESSAGINGSENDERID,
    appid: process.env.VUE_APP_APPId,
    measurement: process.env.VUE_APP_MEASUREMENTID,
  }
  
};
