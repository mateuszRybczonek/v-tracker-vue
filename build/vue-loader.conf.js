'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  compilerModules: [
    {
      preTransformNode(astEl) {
        if (isProduction) {
          const { attrsMap, attrsList } = astEl;
          if (attrsMap["data-test"]) {
            delete attrsMap["data-test"];
            const index = attrsList.findIndex(
              x => x.name === "data-test"
            );
            attrsList.splice(index, 1);
          }
        }
        return astEl;
      }
    }
  ]
}
