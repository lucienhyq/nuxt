
<template>
  <div ID="referees">
    <topNav></topNav>
    <is-layout>
      <div class="contenIndex">
        <div class="refereesLis">
          <div class="refereesLis_left">
            <span>注册裁判列表</span>
          </div>
          <div class="refereesLis_right"></div>
        </div>
        <div class="right">right</div>
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
    .refereesLis{
      display: flex;
      .refereesLis_left{

      }
    }
  }
}
</style>