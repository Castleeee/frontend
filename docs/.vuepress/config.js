module.exports = {
  port:8081,
  title: '项目使用手册',
  description: '欢迎使用xxxx',
  base:'/',
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Production', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.ico',type:"image/x-icon" }],
  ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  lastUpdated: 'Last Updated',
  searchMaxSuggestions:5
};
