var Fly = require("flyio/dist/npm/wx")
var fly = new Fly
import Vue from 'vue'
fly.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data
    }
  },
  (err) => {

  }
)
fly.config.timeout = 10000;
// Set base url
// fly.config.baseURL = "http://localhost:3000/"
fly.config.baseURL = "https://ncma.herokuapp.com/"

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function getHttp(url) {
  return new Promise((res, rej) => {
    fly.get(url)
      .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      });
  })
}

const http = {
  get(url){
    return new Promise((res, rej) => {
      fly.get(url)
        .then(function (response) {
          res(response);
        })
        .catch(function (error) {
          rej(error);
        });
    })
  }
}

export default {
  formatNumber,
  formatTime,
  getHttp,
  http
}
