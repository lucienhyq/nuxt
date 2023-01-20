<template>
  <div class="isLayout">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:{},
  data(){
    return{
      
    }
  },
}
</script>
<style lang="scss" scoped>
.isLayout {
  max-width: 1200px;
  margin: 0 auto;
}
</style>