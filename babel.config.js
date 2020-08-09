const productions = []

// 如果是开发环境development，则不移除console
if (process.env.NODE_ENV === 'production') {
  productions.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env",{"modules": "commonjs"}]
  ],
  // 移除console.log
  plugins: [
    ...productions,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
