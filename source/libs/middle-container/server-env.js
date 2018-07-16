'use strict';

const Logger = require("./logger-container");
const fs = require('fs');
const parser = require('properties-parser');

const FIRST_ENV_PATH = '/data/webapps/paas/ROOT/appenv';
const ENV_PATH = '/data/webapps/appenv';

let props = null;

/**
 * 获取服务器的appenv 配置属性
 * return Object
 * */
exports.getServerProperties = function () {
  if (props) {
    return props;
  }

  var envPath = FIRST_ENV_PATH;
  if (!fs.existsSync(FIRST_ENV_PATH)) {
    envPath = ENV_PATH;
  }

  if (fs.existsSync(envPath)) {
    try {
      props = parser.read(envPath);
    } catch (err) {
      Logger("Server-Env").error('Parse appenv error', err);
      props = {};
    }
  } else {
    Logger("Server-Env").warn(envPath + " not found!");
    props = {};
  }

  Logger("Server-Env").info("appenv " + JSON.stringify(props));
  return props;
};

exports._clear = function () {
  props = null;
};

