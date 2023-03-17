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
            <el-form-item label="裁判昵称">
              <el-input
                v-model="form.referee_name"
                style="width: 200px"
                placeholder="请输入裁判昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="裁判价格">
              <el-input
                v-model="form.referee_Price"
                style="width: 200px"
                placeholder="请输入裁判价格"
              ></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <!-- <el-input v-model="form.avatar"></el-input> -->
              <el-upload
                style="margin-top: 20px"
                enctype="multipart/form-data"
                accept="image/*"
                class="avatar-uploader"
                action="https://lucien.freehk.svipss.top/posts"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <div v-else class="noneAddImg">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <client-only>
              <el-form-item label="所在地区">
                <el-cascader
                  size="large"
                  :options="optionsA"
                  v-model="selectedOptions"
                  @change="handleChange"
                  placeholder="请选择所在地区"
                >
                </el-cascader>
              </el-form-item>
            </client-only>
            <el-form-item label="联系电话" style="width: 320px">
              <el-input
                v-model="form.mobile"
                placeholder="请输入裁判联系电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="请选择裁判等级">
              <el-radio-group v-model="form.level">
                <el-radio label="1">一级</el-radio>
                <el-radio label="2">二级</el-radio>
                <el-radio label="3">三级</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
if (process.client) {
  var regionData = require("element-china-area-data").regionDataPlus;
  var CodeToText = require("element-china-area-data").CodeToText;
}
export default {
  data() {
    return {
      form: {
        referee_name: "",
        referee_Price: "",
        avatar: "",
        city: "",
        mobile: "",
        level: null,
      },
      optionsA: regionData,
      selectedOptions: [],
    };
  },
  head() {
    return {
      title: "裁判平台",
      meta: [
        {
          name: "keywords",
          content: `注册裁判`,
        },
        {
          name: "description",
          content: `注册裁判`,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleChange(value) {
      let str = this.getCodeToText(value.toString(), value);
      this.form.city = str;
    },
    getCodeToText(codeStr, codeArray) {
      if (null === codeStr && null === codeArray) {
        return null;
      } else if (null === codeArray) {
        codeArray = codeStr.split(",");
      }

      let area = "";
      switch (codeArray.length) {
        case 1:
          area += CodeToText[codeArray[0]];
          break;
        case 2:
          area += CodeToText[codeArray[0]] + "/" + CodeToText[codeArray[1]];
          break;
        case 3:
          area +=
            CodeToText[codeArray[0]] +
            "/" +
            CodeToText[codeArray[1]] +
            "/" +
            CodeToText[codeArray[2]];
          break;
        default:
          break;
      }
      if (area[0] == "") {
        area = "全国";
      }
      return area;
    },
    onSubmit() {
      console.log("onSubmit");
      let json = {
        referee_name: this.form.referee_name,
        referee_Price: this.form.referee_Price,
        city: this.form.city,
        mobile: this.form.mobile,
        level: this.form.level,
        avatar: this.form.avatar,
      };
      this.fun.$post("/user/addReferee", json, "loading").then((response) => {
        if (response.result !== 1) {
          this.$message.error(response.msg);
          return;
        }
        this.$message.success(response.msg);
        this.form.referee_name = "";
        this.form.referee_Price = "";
        this.form.avatar = "";
        this.form.city = "";
        this.form.mobile = "";
        this.form.level = "";
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data;
      console.log(this.form.avatar);
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
.avatar {
  width: 150px;
  max-height: 200px;
  border-radius: 5px;
}
.noneAddImg {
  width: 100px;
  height: 100px;
  border: dashed 1px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  .avatar-uploader-icon {
    font-size: 40px;
    color: #999;
  }
}
</style>