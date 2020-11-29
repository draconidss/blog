const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "LifeAlsoIsGG's Blog",
  description: "",
  base: "/Blog-Vuepress/",
  dest: "./dist",

  // 用于jsdeliver CDN加速
  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV
    //判断是否是生产环境
    if(NODE_ENV === 'production'){
      return {
        output: {
          publicPath: 'https://cdn.jsdelivr.net/gh/lifealsoisgg/static-blog@gh-pages/'
        },
        resolve: {
          //配置路径别名
          alias: {
            'public': './public'
          }
        }
      }
    }else{
      return {
        resolve: {
          //配置路径别名
          alias: {
            'public': './public'
          }
        }
      }
    }
  },

  // remove this if you are not using Vue and React in "markdownEnhance: code demo"
  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src:
            "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],



  themeConfig: {
    logo: "/logo.png",
    hostname: "https://blog.lifeisgg.online",
    baseLang: "zh-CN",
    author: "LifeAlsoIsGG",
    nav: [
      {
        text: "分类",
        link: "/category/",
        icon: "note",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "time",
      },
      {
        text: "关于",
        link: "/about/",
        icon: "info",
      },
      {
        text: "相册",
        link: "https://photos.lifeisgg.online/",
        icon: "emoji",
      }

    ],

    sidebar: {
      "/": [
        {
          title: "Java学习",
          icon: "code",
          prefix: "Java/",
          children: ["","Java-BasicNotes", "Java-Interview", "Java-Methods",
            "Java-Collections", "Java-Multithreading", "Java-JVM", "Java-DesignPatterns",
            "Java-reflection", "Java-IO", "Java-Date", "Java-JDK8"]
        },
        {
          title: "Guide",
          icon: "creative",
          prefix: "guide/",
          children: ["", "page", "markdown", "disable", "encrypt"],
        },
        "about"

      ],

    },

    /*algolia搜索*/
    /*    algolia: {
          apiKey: "fdd673871dc964a147e99faca665946a",
          indexName: "blog-search",
        },*/

    blog: {
      intro: "/about/",
      sidebarDisplay: "mobile",
      sidebar: "auto",
      sidebarDepth: 3,
      links: {
        Github: "https://github.com/LifeAlsoIsGG",
        Twitter: "https://twitter.com/LifeAlsoIsGG",
        QQ: "http://localhost:8083/blog-vuepress/tencent:/AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1138312802.html",
        Photos: "https://photos.lifeisgg.online/",
      },
    },

    comment: {
      type: "valine",
      appId: "UhjxD2LPBH9vMPURVoIv0EGJ-gzGzoHsz",
      appKey: "xlubLmY4NeX73i1NivxCO0jA",
      visitor: "true",
      recordIP: "true",
      placeholder: "还请不吝赐教"
    },

    copyright: {
      status: "global",
    },

    footer: {
      display: true,
      content: "粤ICP备19126168号",
    },

    mdEnhance: {
      // please only enable the features you need
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },

    repo: "https://github.com/LifeAlsoIsGG",
    repoLabel: "Github",
  },
});
