<template>
  <div class="tabnav">
    <div class="contenNav">
      <div class="navLi" :class="[routeName == 'index' ? 'isSelect' : '']">
        <nuxt-link to="/">首页</nuxt-link>
      </div>
      <div
        class="navLi"
        :class="[routeName == 'loginReferees' ? 'isSelect' : '']"
      >
        <nuxt-link to="/loginReferees">注册裁判</nuxt-link>
      </div>
      <div class="navLi">裁判列表</div>
      <div class="navLi">联系我们</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeName: this.$route.name,
    };
  },
  mounted() {
    console.log(this.$route.name);
  },
};
</script>

<style lang="scss" scoped>
.tabnav {
  background: #fff;
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 4px solid #0052D1;
  .contenNav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .navLi {
      flex-shrink: 0;
      padding: 15px 20px;
      margin-right: 30px;
      border-radius: 5px;
      a{
        text-decoration: none;
        color: #000;
      }
    }
    .isSelect {
      background: #0052D1;
      a {
        color: #fff;
      }
    }
    .navLi:hover {
      background: #0052D1;
      color: #fff;
      a {
        color: #fff;
      }
    }
  }
}
</style>