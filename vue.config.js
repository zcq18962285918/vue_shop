module.exports = {
  // 这是自定义打包入口
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-pro.js')
      // externals外部引用  http://www.staticfile.org/
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'vue-table-with-tree-grid': 'ZkTable',
        'vue-quill-editor': 'VueQuillEditor',
        echatrs: ' echarts',
        nprogress: 'NProgress'
      })
      // 配置生产环境和开发环境不同的title
      config.plugin('html').tap(args => {
        args[0].title = true
        return args
      })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].title = false
        return args
      })
    })
  }
}
