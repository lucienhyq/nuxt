
<template>
  <div ID="referees">
    <topNav></topNav>
    <is-layout>
      <div class="contenIndex">
        <div class="refereesLis">
          <div class="refereesLis_left">
            <div class="title">已注册裁判列表</div>
            <div class="refereesLis_left_list">
              <el-table
                :data="list"
                style="width: 100%"
                :cell-style="postStyle"
                :header-cell-style="postStyle"
              >
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
            <template v-if="metaData.result == 0">
              <img src="../static/photo-mr.jpg" alt="" />
              <nuxt-link to="/login" class="text">去登录</nuxt-link>
            </template>
            <template v-else>
              <span class="title">用户信息</span>
              <img
                v-if="metaData.data"
                :src="
                  metaData.data.avatar
                    ? metaData.data.avatar
                    : '../static/photo-mr.jpg'
                "
                alt=""
              />
              <div v-if="metaData.data" class="nameTxt">
                {{ metaData.data.user_name }}
              </div>
              <span class="outlogin" @click="outlogin">退出登录</span>
            </template>
          </div>
        </div>
        <div class="newsList" v-if="news.length > 0">
          <span>热点要闻</span>
          <div class="newsLis">
            <div
              class="spanTitle"
              v-for="(item, index) in news"
              :key="index"
              @click="toNews(item.link)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="newsList" v-if="nbaNews.length > 0">
          <span>NBA新闻</span>
          <div class="newsLis">
            <div
              class="spanTitle"
              v-for="(item, index) in nbaNews"
              :key="index"
              @click="toNews(item.link)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
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
      news: [],
      nbaNews: [],
    };
  },
  components: { topNav, isLayout },
  head() {
    return {
      title: "裁判平台",
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
    this.getNews();
    this.getNews(1);
    this.getReferLis();
    // this.getData();
    console.log(window.location.href)
  },
  methods: {
    outlogin() {
      this.fun.$get("/user/outLogin", {}, "loading").then((response) => {
        if (response.result !== 1) {
          this.$message.error(response.msg);
          return;
        }
        // this.getData();
      });
    },
    postStyle() {
      return {
        "text-align": "center",
      };
    },
    getNews(key) {
      let json = {};
      if (key) {
        json.news = 1;
      }
      this.fun.$post("/user/acquirePost", json, "loading").then((response) => {
        if (response.result !== 1) {
          this.$message.error(response.msg);
          return;
        }
        if(response.data){
          if (key) {
            this.nbaNews = response.data;
          } else {
            this.news = response.data;
          }
        }
        
      });
    },
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
          if (response.result !== 1) {
            this.$message.error(response.msg);
            return;
          }
          this.list = response.data;
        });
    },
    getData() {
      this.fun.$post("/user/checkLogin", {}, "loading").then((response) => {
        this.metaData = response;
      });
    },
    toNews(link) {
      window.open(link);
    },
  },
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
    .newsList {
      margin-top: 20px;
      border-radius: 5px;
      padding: 10px 15px;
      .newsLis {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        .spanTitle {
          margin-right: 5%;
          width: 30%;
          flex-shrink: 0;
          color: #999;
          line-height: 30px;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .spanTitle:nth-child(3n) {
          margin-right: 0;
        }
        .spanTitle:hover {
          color: #000;
        }
      }
      span {
        font-weight: bold;
        font-size: 20px;
        text-align: left;
      }
    }
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
        .nameTxt {
          margin-top: 15px;
          text-decoration: none;
          color: #000;
          font-size: 20px;
          margin-bottom: 10px;
        }
        .outlogin {
          color: #999;
        }
        .title {
          margin-bottom: 10px;
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
          padding: 30px 15px;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>