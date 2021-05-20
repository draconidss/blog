const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "LifeAlsoIsGG's Blog",
  description: "We found hope in hopeless place",

  base: "",

  dest: "./dist",

/*  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV;
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
  },*/

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
    logo: "https://cdn.jsdelivr.net/gh/lifealsoisgg/static-blog@gh-pages/logo.png",
    baseLang: "zh-CN",
    sidebarDisplay: "mobile",
    sidebar: "auto",
    sidebarDepth: 3,
    author: "LifeAlsoIsGG",
    nav: [
      {
        text: "分类",
        link: "/category/",
        icon: "note",
      },
      {
        text: "学习笔记",
        link: "/category/学习笔记/",
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
          title: "My-Project",
          icon: "creative",
          prefix: "My-Project/",
          children: ["", "Music-Recognition", "MyProject-AttendanceMiniprogram", "MyProject-JavaWeb-ActivitySystem",
            "MyProject-SupermarketSystem"]
        },
        {
          title: "面试",
          icon: "creative",
          prefix: "Interview/",
          children: ["Java-Interview", "Computer-network", "OperatingSystem", "tencent-cloud-note"]
        },
        {
          title: "Java",
          icon: "code",
          prefix: "Java/",
          children: ["","Java-BasicNotes", "Java-Interview", "Java-Methods","Java-Collections", 
          {
              title: "Java-多线程",
              icon: "",
              prefix: "Java-MultiThread/",
              children: ["", "Java-MultiThread-1", "Java-MultiThread"]
          }, 
            {
              title: "Java-JVM",
              icon: "",
              prefix: "Java-JVM/",
              children: ["", "Java-JVM-Classloader", "Java-JVM-Run", "Java-JVM"]
            }, 
            {
              title: "Java设计模式",
              icon: "",
              prefix: "Java-DesignPatterns/",
              children: ["","Java-DesignPatterns-SevenPrinciple", "Java-DesignPatterns-CreationalPatterns"
                , "Java-DesignPatterns-BehavioralPatterns", "Java-DesignPatterns-StructuralPatterns", "Java-DesignPatterns-J2eePattern"]
            },"Java-String", "Java-reflection", "Java-IO", "Java-Date","Java-UML-ClassDiagram", "Java-JDK8"]

        },

        {
          title: "数据库",
          icon: "creative",
          prefix: "database/",
          children: [
              "",
            {
              title: "Mysql",
              icon: "creative",
              prefix: "Mysql/",
              children: ["Mysql_theory_note", "SQL_note"]
            },

            {
              title: "Redis",
              icon: "creative",
              prefix: "redis/",
              children: ["Redis_theory_note", "Redis_deployment&use","Redis_scene"]
            },

            {
              title: "Hadoop",
              icon: "creative",
              prefix: "Hadoop/",
              children: ["Hadoop_pseudo-distributed_configuration"]
            }

          ],
        },

        {
          title: "Spring",
          icon: "creative",
          prefix: "Spring/",
          children: [
            "", "Spring-bacisNote","Spring-error&hole",
            {
              title: "SpringBoot",
              icon: "creative",
              prefix: "SpringBoot/",
              children: ["SpringBoot&Vue", "Devtools-HotDeployment", "EasyExcel-use", "IDEA-deploy-Run-Dashboard",
                "IDEA-Initial-Springboot+reverse-project+Configuration", "Lombok-use", "Maven-scope",
                "Server-deployment-SpringBoot", "Swagger-use"]
            },

            {
              title: "Mybatis",
              icon: "creative",
              prefix: "Mybatis/",
              children: ["Mybatis-basic-notes", "Mybatis-grammar-notes", "MybatisPlus-notes", "Mybatis-reverse-project&Example-use"]
            },

            {
              title: "SpringCloud",
              icon: "creative",
              prefix: "SpringCloud/",
              children: ["Know-SpringCloud"]
            }

          ],
        },

        {
          title: "数据结构&算法",
          icon: "creative",
          prefix: "dataStructure&algorithm/",
          children: ["", "DataStructure","Algorithm", "DataStructure&algorithm_question"],
        },

        {
          title: "Linux",
          icon: "creative",
          prefix: "Linux/",
          children: ["", "Linux-skill", "Linux-commands", "Use-xshell-to-connect-Centos7-in-VM"],
        },

        {
          title: "ElasticSearch",
          icon: "creative",
          prefix: "ElasticSearch/",
          children: ["ElasticSearch"],
        },

        {
          title: "Docker",
          icon: "creative",
          prefix: "Docker/",
          children: ["", "Docker-Note", "Docker-deployment", "Docker-Install-software"],
        },

        {
          title: "Nginx",
          icon: "creative",
          prefix: "Nginx/",
          children: ["", "Nginx-basicNote&deployment", "Nginx-LoadBalance", "Nginx-ReverseProxy", "Nginx-Dynamic&static"],
        },

        {
          title: "前端",
          icon: "creative",
          prefix: "front-end/",
          children: ["", "JavaScript-Interview", "Promise_Asynchronous_call"],
        },

        {
          title: "错误笔记",
          icon: "creative",
          prefix: "Error/",
          children: ["Springboot-Error"],
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
