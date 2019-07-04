<template>
    <div class="home">
      <div>
        <DaoHang v-on:change="getChildData"></DaoHang>
      </div>
      <div>
        <component v-bind:is="comp" :editPage="editPage" :outorderId="outorderId" :order_num_id="order_num_id" v-on:changeMain="changeBody"></component>
      </div>
    </div>
</template>

<script>
import Login from '@/components/Login'
import DaoHang from '@/components/base/Daohang'
import MaterialList from '@/components/material/MaterialList'
import MaterialAdd from '@/components/material/MaterialAdd'
import MaterialEdit from '@/components/material/MaterialEdit'
import OrderList from '@/components/order/orderList'
import OutList from '@/components/outorder/OutList'
import OutAdd from '@/components/outorder/OutAdd'
import OutEdit from '@/components/outorder/OutEdit'
import OrderAdd from '@/components/order/OrderAdd'
import OrderEdit from '@/components/order/OrderEdit'

export default {
  name: 'Home',
  components: { Login, DaoHang, MaterialList, MaterialAdd, MaterialEdit, OrderList, OutList, OrderAdd, OrderEdit, OutAdd, OutEdit },
  data () {
    return {
      comp: 'MaterialList',
      activeIndex: '1',
      activeIndex2: '1',
      editPage: 0, // 待编辑的页面id
      order_num_id: '', // 订单详情编辑页面
      outorderId: '' // 出货单详情页面id
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getChildData (msg) {
      console.log(msg)
      this.comp = msg[0]
    },
    changeBody (msg) {
      if (msg[1] === 'order_edit') {
        this.order_num_id = msg[2]
      } else {
        if (msg[1] === 'OutorderId') {
          this.outorderId = msg[2]
        }
      }
      console.log(msg)
      this.comp = msg[0]
      this.editPage = msg[1]
    }
  }
}
</script>

<style scoped>
.home{
    padding: 0;
    margin: 0;
}
</style>
