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
        let webToken = localStorage.getItem("refereesToken");
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
          headers = {
            Authorization: "Bearer "+webToken
          };
        }

        return new Promise((resolve, reject) => {
          url = baseUrl + url;
          console.log(baseUrl , url)
          axios.post(url, params, { headers: headers })
            .then(res => {
              if (res.data.result === 0 && (res.data.msg == "未登录" || res.data.msg == "请登录")) {
                if (message) {
                  loading.close();
                }
                Message.error(res.data.msg);
                window.location.href = `${window.location.href}login`
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
        let webToken = localStorage.getItem("refereesToken");
        if (message) {
          loading = Loading.service({
            lock: true,
            text: 'loading',
            spinner: "el-icon-loading",
            background: "transparent"
          });
        }
      
        let baseUrl = "";
      
        let headers = {
          Authorization: "Bearer "+webToken
        };
      
        return new Promise((resolve, reject) => {
          url = baseUrl + url;
          axios.get(url, {
            params: params
          }, { headers: headers }).then(res => {
            if (res.data.result === 0 && res.data.data && res.data.data.login_status === 1) {
              if (message) {
                loading.close();
              }
              // sessionStorage.setItem("yz_redirect", document.location.href);
              // window.location.href = this.getSiteRoot() + "/plugins/shop_server/login?i=" + res.data.data.i;
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
      },
      isPc(){
        if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
          return false;
        } else {
          return true;
        }
      }
    }

  }
}

Vue.use(fun);



