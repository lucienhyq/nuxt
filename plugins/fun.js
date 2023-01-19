import Vue from 'vue'
import axios from 'axios'
import { Loading, MessageBox, Message } from "element-ui";
var loading;
var fun = {

  install(Vue) {

    Vue.prototype.fun = {
      // mounted等其他接口请求封装
      $post(url, params, message, type, headers) {
        // 请求超时的时间限制
        axios.defaults.timeout = 20000;

        if (message) {
          loading = Loading.service({
            lock: true,
            text: 'loading',
            spinner: "el-icon-loading",
            background: "transparent"
          });
        }

        let baseUrl = "";
        if (!headers) {
          headers = {};
        }
        if (window.new_page_comeIn != 2) {
          // 浏览足迹  new_page_comeIn == 2为页面第一个请求接口
          // headers['local-url'] = `/${window.location.href.match(/shop_server\/(\S*)\?/) ? window.location.href.match(/shop_server\/(\S*)\?/)[1] : window.location.href.match(/82\/(\S*)\?/)[1]}`;
          headers['full-url'] = `/${window.location.href}`;
        }

        return new Promise((resolve, reject) => {
          url = baseUrl + url;
          console.log(baseUrl , url)
          axios.post(url, params, { headers: headers })
            .then(res => {
              if (res.data.result === 0 && res.data.data && res.data.data.login_status === 1) {
                if (message) {
                  loading.close();
                }
                console.log(res)
                // sessionStorage.setItem("yz_redirect", document.location.href);
                // window.location.href = this.getSiteRoot() + "/plugins/shop_server/login?i=" + res.data.data.i;
              }
              return res.data
            })
            .then(res => {
              resolve(res);
              if (message) {
                loading.close();
              }
            }).catch(err => {
              reject(err);
              if (message) {
                loading.close();
              }
            })
        })
      },
      $get(url, params, message) {
        // 请求超时的时间限制
        axios.defaults.timeout = 20000;
      
        if (message) {
          loading = Loading.service({
            lock: true,
            text: 'loading',
            spinner: "el-icon-loading",
            background: "transparent"
          });
        }
      
        let baseUrl = "";
      
        let headers = {};
        if (window.new_page_comeIn != 2) {
          // 浏览足迹  new_page_comeIn == 2为页面第一个请求接口
          // headers['local-url'] = `/${window.location.href.match(/shop_server\/(\S*)\?/) ? window.location.href.match(/shop_server\/(\S*)\?/)[1] : window.location.href.match(/82\/(\S*)\?/)[1]}`;
          headers['full-url'] = `/${window.location.href}`;
          window.new_page_comeIn = 2;
        }
      
        return new Promise((resolve, reject) => {
          url = baseUrl + url;
          axios.get(url, {
            params: params
          }, { headers: headers }).then(res => {
            if (res.data.result === 0 && res.data.data && res.data.data.login_status === 1) {
              if (message) {
                loading.close();
              }
              sessionStorage.setItem("yz_redirect", document.location.href);
              window.location.href = this.getSiteRoot() + "/plugins/shop_server/login?i=" + res.data.data.i;
            }
            return res.data
          }).then(res => {
            resolve(res);
            if (message) {
              loading.close();
            }
            // 返回请求成功的数据 data
          }).catch(err => {
            reject(err);
            if (message) {
              loading.close();
            }
          })
        })
      }
    }

  }
}

Vue.use(fun);



