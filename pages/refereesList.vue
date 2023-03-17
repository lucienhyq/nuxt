<template>
  <div class="refereesList">
    <topNav></topNav>
    <isLayout>
      <div class="selectBox">
        <div class="topBg">
          <div class="txt">筛选</div>
          <div class="moreLogin" @click="toLoginReferees">注册裁判
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          label-position="left"
          :inline="true"
        >
          <el-form-item>
            <el-input
              v-model.trim="form.referee_name"
              placeholder="请输入裁判昵称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="form.city"
              placeholder="请输入裁判所在城市"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="form.creatId"
              placeholder="请输入会员id"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="onSubmit">搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="list">
        <el-table
          :data="list"
          style="width: 100%"
          :cell-style="postStyle"
          :header-cell-style="postStyle"
        >
          <el-table-column prop="referee_name" label="裁判名称" width="250">
            <template slot-scope="scope">
              <img class="memberUrl" :src="scope.row.avatar" alt="" />
              <div class="nameTxt">{{ scope.row.referee_name }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
          ></el-table-column>
          <el-table-column prop="mobile" label="联系方式"></el-table-column>
          <el-table-column prop="city" label="地区"></el-table-column>
          <el-table-column prop="level" label="裁判资格等级">
            <template slot-scope="scope">
              <span>{{ changeLevel(scope.row.level) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="referee_Price"
            label="裁判出场费价格（元）"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >预约</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
        name: "",
        city: "",
        creatId: "",
        level: "",
      },
      metaData: [],
      list: [],
      options: [
        { value: "", label: "请选择" },
        { value: "1", label: "等级一" },
        { value: "2", label: "等级二" },
        { value: "3", label: "等级三" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  head() {
    return {
      title: "裁判列表",
      meta: [
        {
          name: "keywords",
          content: `裁判列表`,
        },
        {
          name: "description",
          content: `裁判信息平台`,
        },
      ],
    };
  },
  methods: {
    toLoginReferees(){
      this.$router.push({ name: "loginReferees", params: {} });
    },
    reset() {
      this.form.referee_name = "";
      this.form.city = "";
      this.form.creatId = "";
      this.form.level = "";
      this.getData();
    },
    changeLevel(level) {
      if (level == 1) {
        return "一级";
      } else if (level == 2) {
        return "二级";
      } else if (level == 3) {
        return "三级";
      } else {
        return "暂无等级";
      }
    },
    onSubmit(e) {
      console.log(e);
      let json = {
        name: this.form.referee_name,
        city: this.form.city,
        creatId: this.form.creatId,
        level: this.form.level,
      };
      this.fun
        .$post("/user/searchReferee", json, "loading")
        .then((response) => {
          if (response.result !== 1) {
            this.$message.error(response.msg);
            return;
          }
          this.list = response.data.list;
        });
    },
    handleClick(row) {
      console.log(row);
    },
    getData() {
      let json = {};
      this.fun
        .$post("/user/searchReferee", json, "loading")
        .then((response) => {
          if (response.result !== 1) {
            this.$message.error(response.msg);
            return;
          }
          this.list = response.data.list;
        });
    },
    postStyle() {
      return {
        "text-align": "center",
      };
    },
  },
  components: { topNav, isLayout },
};
</script>
<style lang="scss" scoped>
.refereesList {
  min-width: 1200px;
  min-height: 100vh;
  background: #f1f2f4;
  border-radius: 4px;
  .selectBox {
    margin-top: 20px;
    padding: 30px 20px 0 20px;
    background: #fff;
    .topBg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .txt{
        font-size: 20px;
        font-weight: bold;
      }
      .moreLogin{
        cursor: pointer;
        font-size: 18px;
        color: #999;
      }
    }
  }
  .list {
    .memberUrl {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .nameTxt {
    }
  }
}
</style>