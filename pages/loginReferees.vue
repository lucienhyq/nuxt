<template>
  <div id="loginReferees">
    <topNav></topNav>
    <isLayout>
      <div class="registerBox">
        <div class="title">注册裁判</div>
        <div class="formBox">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="裁判名称">
              <el-input
                v-model="form.referee_name"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="裁判价格">
              <el-input
                v-model="form.referee_Price"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <!-- <el-input v-model="form.avatar"></el-input> -->
              <el-upload
                style="margin-top: 20px"
                enctype="multipart/form-data"
                accept="image/*"
                class="avatar-uploader"
                action="/user/posts"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <div v-else class="noneAddImg">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="所在地区">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" style="width: 200px">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="裁判等级">
              <el-radio-group v-model="form.level">
                <el-radio label="1">一级</el-radio>
                <el-radio label="2">二级</el-radio>
                <el-radio label="3">三级</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </isLayout>
  </div>
</template>
<script>
import topNav from "../components/navChild/topNav.vue";
import isLayout from "~/components/defauleLayou.vue";
export default {
  data() {
    return {
      form: {
        referee_name: "",
        referee_Price: "",
        avatar: "",
        city: "",
        mobile: "",
        createID: 0,
        level: null,
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("onSubmit");
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data;
    },
  },
  components: { topNav, isLayout },
};
</script>
<style lang="scss" scoped>
.registerBox {
  padding: 30px 0;
  .title {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .formBox {
    overflow: hidden;
    box-sizing: border-box;
  }
}
.avatar{
  width: 150px;
  max-height: 200px;
  border-radius: 5px;
}
.noneAddImg{
  width: 100px;
  height: 100px;
  border: dashed 1px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  .avatar-uploader-icon{
    font-size: 40px;
    color: #999;
  }
}
</style>