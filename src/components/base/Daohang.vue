<template>
  <div style="margin-top: -61px;">
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        @select="handleSelect">
        <el-menu-item index="MaterialList">物料管理</el-menu-item>
        <el-menu-item index="OrderList">订单建档</el-menu-item>
        <el-menu-item index="OutList">订单出货</el-menu-item>
        <!--<el-menu-item index="MaterialAdd">添加物料</el-menu-item>-->
        <!--<el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
      </el-menu>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Daohang',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('change', [key])
    }
  }
}
</script>

<style scoped>

</style>
