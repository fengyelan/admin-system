/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-20 13:50:45
 * @version $Id$
 */

import { config } from './config.js';

import axios from 'axios';

import { CodeToText } from 'element-china-area-data'

/*
 *@desc 封装axios，单个请求
 */
export const fetch = (path, param, callback) => {
  console.log(config.host + path);
  axios.get(config.host + path, {
    params: param
  }).then((res) => {
    callback(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

/*
 *@desc 封装axios，多个请求
 */
export const fetchMuti = (paths, callback) => {
  let axiosQuerys = [];
  for (var path of paths) {
    axiosQuerys.push(axios.get(path));
  }
  axios.all(axiosQuerys)
    .then(axios.spread((res1, res2) => {
      callback(res1.data, res2.data);
    })).catch((err) => {
      console.log(err);
    });
}

/*
 *@desc 地区 转换code为文本
 */
export const placeCodeToText = (formPlace) => {
  let place = '';
  formPlace.forEach((item, index) => {
    if (index !== 0) {
      place += '-';
    }
    place += CodeToText[item];
  });
  return place;
}

// /*
//  *@desc 获得ip
//  */
// const getIp = () => {
//   axios.get(config.acquireIp).then((res) => {
//     return res.data.origin
//   }).catch((err) => {
//     console.log(err);
//   });
// }

// export const getAddressInfo =  () => {
//   const ip = getIp();
//   axios.get(config.acquireRegion,{
//     params:{
//       ip:ip
//     }
//   }).then((res)=>{
//     return res.data.data;
//   }).catch((err) => {
//     console.log(err);
//   });
// }

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/*
 *将数据库的时间进行格式化，并且输出 yyyy-mm-dd hh:mm:ss
 */
export const formatDate = date => {
  if (!date) {
    return;
  }
  const _date = new Date(date),
    year = _date.getFullYear(),
    month = _date.getMonth() + 1,
    day = _date.getDate(),
    hour = _date.getHours(),
    min = _date.getMinutes(),
    sec = _date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}
