const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
  // use the MobX rewire
  config = rewireMobX(config,env);


  // get the ts rule, very hacky, i know
  const tsRule = config.module.rules[1].oneOf[2];
  tsRule.include = [tsRule.include, path.resolve('node_modules', '@hrgui'), path.resolve('../')];
  // console.dir(tsRule);
  return config;
}