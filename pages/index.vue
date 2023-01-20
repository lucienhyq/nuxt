
<template>
  <div ID="referees">
    <topNav></topNav>
    <is-layout>
      <div class="contenIndex">
        <div class="refereesLis">
          <div class="refereesLis_left">
            <div class="title">注册裁判列表</div>
            <div class="refereesLis_left_list">
              <el-table :data="list" style="width: 100%">
                <el-table-column
                  prop="referee_name"
                  label="裁判名称"
                  width="130"
                ></el-table-column>
                <el-table-column
                  prop="create_time"
                  label="注册时间"
                ></el-table-column>
                <el-table-column
                  prop="mobile"
                  label="联系方式"
                ></el-table-column>
                <el-table-column prop="city" label="地区"></el-table-column>
                <el-table-column
                  prop="referee_Price"
                  label="裁判出场费价格（元）"
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="refereesLis_right">
            <span class="title">用户信息</span>
            <template v-if="metaData.result == 0">
              <img src="../static/photo-mr.jpg" alt="" />
              <nuxt-link to="/login" class="text">去登录</nuxt-link>
            </template>
            <template v-else>
              <img src="../static/photo-mr.jpg" alt="" />
              <div v-if="metaData.data">{{metaData.data.userName}}</div>
            </template>
          </div>
        </div>
        <div class="right"></div>
      </div>
    </is-layout>
  </div>
</template>
<script>
import topNav from "../components/navChild/topNav.vue";
import isLayout from "../components/defauleLayou.vue";
export default {
  data() {
    return {
      metaData: {},
      list: [],
    };
  },
  components: { topNav, isLayout },
  head() {
    return {
      title: "裁判首页",
      meta: [
        {
          name: "keywords",
          content: `裁判首页`,
        },
        {
          name: "description",
          content: `裁判首页`,
        },
      ],
    };
  },
  mounted() {
    this.getReferLis();
    this.getData();
    // if(this.metaData.result == 0){
    //   this.$message.error(this.metaData.msg)
    // }
  },
  methods: {
    getReferLis() {
      this.fun
        .$post(
          "/user/allReferee",
          {
            is: 1,
          },
          "loading"
        )
        .then((response) => {
          console.log(response, "dddddddddddd");
          if (response.result !== 1) {
            this.$message.error(response.msg);
            return;
          }
          this.list = response.data;
        });
    },
    getData() {
      this.fun
        .$post(
          "/user/checkLogin",
          {},
          "loading"
        )
        .then((response) => {
          console.log(response, "dddddddddddd");
          this.metaData = response;
        });
    },
  },
  // async asyncData({ params, query, store, app }) {
  //   //首页信息
  //   let metaData = await app.$axios.post(
  //     `http://localhost:3000/checkLogin`,
  //     {},
  //     {}
  //   );
  //   return {
  //     metaData: metaData,
  //   };
  // },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>
<style lang="scss" scoped>
#referees {
  min-width: 1200px;
  min-height: 100vh;
  background: #f1f2f4;
  .contenIndex {
    margin-top: 20px;
    background: #fff;
    .refereesLis {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      .refereesLis_right {
        width: 30%;
        flex-shrink: 0;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
        .text {
          font-size: 16px;
          margin-top: 30px;
          color: red;
          text-decoration: none;
          color: #000;
        }
      }
      .refereesLis_left {
        flex: 1;
        .title {
          font-size: 20px;
          font-weight: bold;
          padding: 10px 15px;
        }
        .refereesLis_left_list {
          padding: 0 15px;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>