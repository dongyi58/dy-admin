// vue.config.js
module.exports = {
  publicPath: './',
    css:{
      loaderOptions:{
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.sass` 这个文件
          // 注意：在 sass-loader v7 中，这个选项名是 "data"
          prependData: `@import "~@/common/global.scss";`
        },
      }
    }
 }