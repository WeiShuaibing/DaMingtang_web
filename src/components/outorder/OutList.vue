<template>
  <div>
    <div style="margin-top: 10px;"></div>
    <el-row :gutter="10">
      <el-col :span="2">
        <el-button type="primary" style="width: 120px;" @click="toOutAddPage()" icon="el-icon-circle-plus">新增</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入关键词 ....  模糊搜索" v-model="fuzzyMatchingString" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top: 10px;"></div>
    <el-row :gutter="10">
      <el-col :span="2">
        <div class="title_word">总金额:</div>
      </el-col>
      <el-col :span="3">
        <el-input prefix-icon="el-icon-s-flag" disabled="" v-model="to_money"></el-input>
      </el-col>
      <el-col :span="2">
        <div class="title_word">总金额(虚):</div>
      </el-col>
      <el-col :span="3">
        <el-input prefix-icon="el-icon-s-flag" disabled="" v-model="to_money_xu"></el-input>
      </el-col>
      <el-col :span="2">
        <div class="title_word">总做账金额:</div>
      </el-col>
      <el-col :span="3">
        <el-input prefix-icon="el-icon-s-flag" disabled="" v-model="to_makemoney"></el-input>
      </el-col>
    </el-row>
    <div style="margin-top: 10px;"></div>
    <div style="margin-left: 20px;margin-right: 20px">
      <el-table
        :data="SellList" border highlight-current-row style="width: 100%">
        <!--<el-table-column fixed prop="id" label="ID" width="140"></el-table-column>-->
        <el-table-column fixed prop="sell_num" label="出货单编号" width="140"></el-table-column>
        <el-table-column prop="or_num" label="订单编号" width="150px"></el-table-column>
        <el-table-column prop="custom" label="客户" width="140"></el-table-column>
        <el-table-column prop="sell_date" label="发货日期" width="140"></el-table-column>
        <el-table-column prop="total_money" label="总金额" width="80"></el-table-column>
        <el-table-column prop="total_money_xu" label="总金额(虚)" width="100"></el-table-column>
        <el-table-column prop="make_money" label="做账金额" width="80"></el-table-column>
        <el-table-column prop="handler" label="经手人" width="120"></el-table-column>
        <el-table-column prop="place_order_date" label="经手日期" width="120"></el-table-column>
        <el-table-column prop="material_name" label="物料名称"></el-table-column>
        <el-table-column prop="sell_remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="success" style="width: 70px;" @click="editData(scope.row)">详情</el-button>
            <!--<el-button type="danger" style="width: 70px;" @click="deleteMaterial(scope.row)" >删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 30px;margin-bottom: 50px;margin-left: 100px;float: left">
      <!-- 分页 -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalRow">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutList',
  data () {
    return {
      to_money: 0,
      to_money_xu: 0,
      to_makemoney: 0,
      SellList: [],
      fuzzyMatchingString: '', // 模糊匹配字符串
      pageSize: 10,
      totalRow: 0,
      currentPage: 1
    }
  },
  created: function () {
    this.initOutListData()
    this.init_total_money()
  },
  methods: {
    init_total_money () {
      this.axios.get(this.GLOBAL.BASE_URL + '/outorder/selectTotalMoney')
        .then(res => {
          if (res.data.code === 20000) {
            this.to_money = res.data.data.to_money
            this.to_money_xu = res.data.data.to_money_xu
            this.to_makemoney = res.data.data.to_makemoney
          } else {
            this.$message.error('总金额信息查询失败 ！！！')
          }
        })
    },
    initOutListData () {
      this.axios.get(this.GLOBAL.BASE_URL + '/outorder/find?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize)
        .then(res => {
          if (res.data.code === 20000) {
            this.SellList = res.data.data.rows
            this.totalRow = res.data.data.total
          } else {
            this.$message.error('出货数据加载失败 ！！！')
          }
        })
    },
    toOutAddPage () {
      this.$emit('changeMain', ['OutAdd'])
    },
    search () {
      this.axios.get(this.GLOBAL.BASE_URL + '/outorder/findFuzzyMatchingString?fuzzyMatchingString=' + this.fuzzyMatchingString)
        .then(res => {
          if (res.data.code === 20000) {
            this.SellList = []
            this.SellList = res.data.data
          }
        })
    },
    editData (row) {
      console.log('跳转到详情页面' + row.id)
      this.$emit('changeMain', ['OutEdit', 'OutorderId', row.id])
    },
    deleteMaterial (row) {
      console.log('删除')
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.axios.get(this.GLOBAL.BASE_URL + '/outorder/find?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize)
        .then(res => {
          if (res.data.code === 20000) {
            this.SellList = res.data.data.rows
            this.totalRow = res.data.data.total
          } else {
            this.$message.error('出货数据加载失败 ！！！')
          }
        })
    }
  }
}
</script>

<style scoped>
  .title_word{
    font-size: 16px;
    line-height: 40px;
  }
</style>
