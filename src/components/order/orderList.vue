<template>
  <div>
    <div style="margin-top: 10px;"></div>
    <el-row :gutter="10">
      <el-col :span="2">
        <el-button type="primary" style="width: 120px;" @click="toOrderAddPage()" icon="el-icon-circle-plus">新增</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入关键词 ....  模糊搜索" v-model="fuzzyMatchingString" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top: 10px;"></div>
    <div style="margin-left: 20px;margin-right: 10px;">
      <el-table
        id="orderlistexport"
        :data="orderList" border highlight-current-row style="width: 100%">
        <el-table-column fixed prop="or_num" label="订单编号" width="160"></el-table-column>
        <el-table-column prop="custom" label="客户" width="200px"></el-table-column>
        <el-table-column prop="place_order_date" label="下单日期" width="150"></el-table-column>
        <el-table-column prop="hand_order_date" label="预交日期" width="150"></el-table-column>
        <el-table-column prop="receiver" label="接收人" width="150"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="150"></el-table-column>
        <el-table-column prop="handler" label="经手人" width="150"></el-table-column>
        <el-table-column prop="od_remark" label="备注" width="200"></el-table-column>
        <el-table-column prop="material_name" label="物料名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="success" style="width: 70px;">查看</el-button>-->
            <el-button type="success" style="width: 70px;" @click="editData(scope.row)">详情</el-button>
            <el-button type="danger" style="width: 70px;" @click="deleteMaterial(scope.row)" >删除</el-button>
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
  name: 'orderList',
  data () {
    return {
      orderList: [],
      fuzzyMatchingString: '', // 模糊匹配字符串
      pageSize: 10,
      totalRow: 0,
      currentPage: 1
    }
  },
  created: function () {
    this.initGetOrderList()
  },
  methods: {
    deleteMaterial (row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get(this.GLOBAL.BASE_URL + '/order/deleteById?id=' + row.id)
          .then(res => {
            if (res.data.code === 20000) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.initGetOrderList()
            } else {
              this.$message({
                message: '出现异常，删除失败!!!',
                type: 'warning'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editData (row) {
      this.$emit('changeMain', ['OrderEdit', 'order_edit', row.or_num])
    },
    search () {
      if (this.fuzzyMatchingString === '') {
        this.initGetOrderList()
      } else {
        this.axios.get(this.GLOBAL.BASE_URL + '/order/findFuzzyMatching?matchstr=' + this.fuzzyMatchingString)
          .then(res => {
            if (res.data.code === 20000) {
              this.orderList = res.data.data
            }
          })
      }
    },
    toOrderAddPage () {
      this.$emit('changeMain', ['OrderAdd'])
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initGetOrderList()
    },
    initGetOrderList () {
      this.axios.get(this.GLOBAL.BASE_URL + '/order/findOrderList', {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then(res => {
          console.log(res.data)
          if (res.data.code === 20000) {
            this.totalRow = res.data.data.total
            this.orderList = res.data.data.rows
          } else {
            this.$message.error('订单数据加载失败！！！')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
