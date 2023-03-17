<template>
  <div id="quill">
    <section class="container">
      <div
        class="quill-editor"
        :content="conten"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
        ref="myQuillEditor"
      ></div>
    </section>
    <el-upload
      drag
      enctype="multipart/form-data"
      accept="image/*"
      class="quill-upload"
      :on-success="quillSuccess"
      action="https://lucien.freehk.svipss.top/posts"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"], // remove formatting button
];
export default {
  props: {
    contenInfo: {
      type: null,
    },
  },
  data() {
    return {
      conten: "",
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // 重写点击组件上的图片按钮要执行的代码
              image: function (value) {
                document.querySelector(".quill-upload .el-icon-upload").click();
              },
            },
          },
        },
      },
    };
  },
  mounted() {
    this.conten = this.contenInfo;
  },
  methods: {
    quillSuccess(e) {
      console.log(e.data);
      let imgUrl = e.data;
      this.conten += `<img src="${imgUrl}" alt="内容图片">`;
      console.log(this.conten,'ddddddddd')
    },
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
      this.$emit('quillBlur',this.conten)
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      this.conten = html;
    },
  },
};
</script>
<style lang="scss" scoped>
.quill-upload {
  opacity: 0;
  position: absolute;
  top: -1000px;
  left: 0;
}
</style>
