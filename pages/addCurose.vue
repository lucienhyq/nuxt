<template>
  <div id="addCurose">
    <topNav></topNav>
    <isLayout>
      <div class="bgbox">
        <div class="title">新增课程</div>
        <div class="formBox">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="课程标题">
              <el-input
                v-model="form.title"
                style="width: 200px"
                placeholder="请输入课程标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="课程价格">
              <el-input
                v-model="form.course_price"
                style="width: 200px"
                placeholder="请输入课程价格"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品详情">
              <el-input
                v-model="form.conten"
                style="width: 200px"
                placeholder="请输入商品详情"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品是否上架">
              <el-switch v-model="form.shelfStatus"> </el-switch>
              <span class="shelfStatusTxt">{{
                form.shelfStatus ? "上架" : "下架"
              }}</span>
            </el-form-item>
            <el-form-item label="课程图片">
              <el-upload
                action="https://lucien.freehk.svipss.top/posts"
                list-type="picture-card"
                :on-success="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <!-- <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog> -->
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
        // 课程标题
        title: "",
        // 课程价格
        course_price: "",
        // 商品详情
        conten: "",
        // 商品是否上架
        shelfStatus: false,
        // 课程图片
        goodimg: [],
        // 库存
        inventory: 100,
      },
      dialogVisible:false
    };
  },
  components: { isLayout, topNav },
  head() {
    return {
      title: "新建课程",
    };
  },
  mounted() {},
  methods: {
    handleRemove(e){
      console.log(e)
    },
    handlePictureCardPreview(file) {
      this.form.goodimg.push(file.data)
      console.log(this.form.goodimg,'goodimg')
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
#addCurose {
  background: #f7f7f7;
}
.formBox {
  margin-top: 20px;
  .shelfStatusTxt {
    color: #999;
  }
}
.bgbox {
  margin-top: 20px;
  background: #fff;
  padding: 20px 25px;
  border-radius: 10px;
  min-height: 100vh;
  .title {
    font-size: 20px;
    font-weight: bold;
    position: relative;
    padding-left: 10px;
  }
  .title::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background: #f1e5f1;
  }
}
</style>