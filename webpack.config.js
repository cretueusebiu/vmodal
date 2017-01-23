module.exports = {
  output: {
    filename: 'vmodal.js'
  },
  externals: {
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      global: 'jQuery',
      root: 'jQuery'
    }
  }
}
