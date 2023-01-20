<template>
  <div class="login">
    <isLayout>
      <div class="ishead">
        <div class="ishead_left" @click="toHome">
          <i class="iconfont icon-fontclass-bumenguanli"></i>
          <span>篮球裁判平台</span>
        </div>
      </div>
    </isLayout>
    <topNav></topNav>
    <div class="loginConten">
      <isLayout>
        <div class="contenbox">
          <div class="txt">
            <span @click="status = 1" :class="[status == 1 ? 'isSelect' : '']"
              >登录</span
            >
            <span class="isSelect">/</span>
            <span @click="status = 2" :class="[status == 2 ? 'isSelect' : '']"
              >注册</span
            >
          </div>
          <el-input
            v-model="user_name"
            placeholder="请输入账号"
            style="margin-bottom: 22px"
          ></el-input>
          <el-input v-model="password" placeholder="请输入密码"></el-input>
          <div class="tips" v-if="status == 1" @click="status = 2">
            未注册会员，先去注册
          </div>
          <div class="btn" v-if="status == 1" @click="postLogin">登录</div>
          <div class="btn" v-if="status == 2">注册</div>
        </div>
      </isLayout>
    </div>
  </div>
</template>
<script>
import topNav from "~/components/navChild/topNav.vue";
import isLayout from "~/components/defauleLayou.vue";
export default {
  data() {
    return {
      user_name: "",
      password: "",
      status: 1,
    };
  },
  methods: {
    toHome() {
      this.$router.push({ name: "index", params: {} });
    },
    postLogin() {
      if (!this.user_name || !this.password) {
        this.$message.error("请输入正确用户名和密码");
        return;
      }
      let json = {
        user_name: this.user_name,
        password: this.password,
      };
      this.fun.$post("/user/login", json, "loading").then((response) => {
        if (response.result) {
          this.$message.success(response.msg);
          this.$router.push({ name: "index", params: {} });
        } else {
          this.$message.error(response.msg);
        }
        console.log(response, "dddddddddddd");
      });
    },
  },
  components: { isLayout, topNav },
};
</script>
<style lang="scss" scoped>
.ishead {
  display: flex;
  padding: 30px 0;
  .ishead_left {
    cursor: pointer;
    .icon-fontclass-bumenguanli {
      color: yellowgreen;
      font-size: 40px;
    }
    span {
      font-size: 35px;
    }
  }
}
.loginConten {
  height: 700px;
  background: url("~/static/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .contenbox {
    float: right;
    width: 400px;
    height: 350px;
    margin-top: 90px;
    background: #fff;
    border-radius: 10px;
    padding: 50px;
    box-sizing: border-box;
    .btn {
      margin: 20px 35px;
      border-radius: 5px;
      background-color: #0978f7;
      text-align: center;
      line-height: 35px;
      color: #fff;
    }
    .tips {
      color: #f56c6c;
      text-align: right;
      margin-top: 15px;
    }
    .txt {
      font-size: 30px;
      font-weight: bold;
      padding-bottom: 15px;
      color: #999;
      .isSelect {
        color: #000;
      }
    }
  }
}
</style>