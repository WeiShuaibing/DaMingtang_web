<template>
    <div>
      <div style="margin-top: 10px;"></div>
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button type="primary" style="width: 120px;" @click="toAddPage()" icon="el-icon-circle-plus">添加</el-button>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入关键词 ....  模糊搜索" v-model="fuzzyMatchingString" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
      <div style="margin-top: 10px;"></div>
      <div style="margin-left: 20px;margin-right: 10px;">
        <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column
          fixed
          prop="ma_num"
          label="物料编号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="ma_name"
          label="名称"
          width="200px"
          >
        </el-table-column>
        <el-table-column
          prop="ma_grade"
          label="等级"
          width="90">
        </el-table-column>
        <el-table-column
          prop="ma_long"
          label="长(mm)"
          width="70">
        </el-table-column>
        <el-table-column
          prop="ma_wide"
          label="宽(mm)"
          width="70">
        </el-table-column>
        <el-table-column
          prop="ma_high"
          label="高(mm)"
          width="70">
        </el-table-column>
        <el-table-column
          prop="ma_area"
          label="面积"
          width="70">
        </el-table-column>
        <el-table-column
          prop="ma_volume"
          label="体积"
          width="70">
        </el-table-column>
        <el-table-column
          prop="ma_price"
          label="默认售价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="ma_attribute"
          label="属性"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ma_wuliao_type"
          label="物料类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ma_bancai_type"
          label="板材类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ma_unit"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="ma_invented"
          label="虚拟物品"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ma_weight"
          label="毛重(g)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ma_remark"
          label="备注"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="success" style="width: 70px;">查看</el-button>-->
            <el-button type="success" style="width: 70px;" @click="editData(scope.row)">修改</el-button>
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
  name: 'MaterialList',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      totalRow: 0,
      currentPage: 1,
      fuzzyMatchingString: ''
    }
  },
  methods: {
    deleteMaterial (row) {
      this.$confirm('此操作将删除该物料信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        this.axios.get(this.GLOBAL.BASE_URL + '/material/deleteMaterialById?id=' + row.id)
          .then(res => {
            if (res.data.code === 20000) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.findData(this.currentPage, this.pageSize)
            } else {
              this.$message({
                type: 'info',
                message: '异常！ 删除失败！'
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
      this.$emit('changeMain', ['MaterialEdit', row.id])
    },
    search () {
      this.axios.get(this.GLOBAL.BASE_URL + '/material/fuzzyMatching', {
        params: {
          matchingStr: this.fuzzyMatchingString
        }
      })
        .then(res => {
          if (res.data.code === 20000) {
            this.tableData = res.data.data.rows
            this.totalRow = res.data.data.total
          } else {
            this.$notify.error({
              title: '警告',
              message: ' 搜索失败 ！！！'
            })
          }
        })
    },
    handleCurrentChange (val) {
      this.findData(val, this.pageSize)
    },
    toAddPage () {
      this.$emit('changeMain', ['MaterialAdd'])
    },
    handleClick (row) {
      console.log(row)
    },
    findData (curPage, pageSize) {
      this.axios.get(this.GLOBAL.BASE_URL + '/material/find', {
        params: {
          currentPage: curPage,
          pagesize: pageSize
        }
      })
        .then(res => {
          if (res.data.code === 20000) {
            this.tableData = res.data.data.rows
            this.totalRow = res.data.data.total
            // console.log(res.data)
          } else {
            this.$notify.error({
              title: '警告',
              message: ' 物料属性 信息加载失败 ！！！'
            })
          }
        })
    }
  },
  created: function () {
    if (this.$store.state.role !== 'admin_damingtang') {
      this.$router.push({path: '/'})
    }
    this.findData(1, this.pageSize)
  }
}
</script>

<style scoped>
.btn-next{
  width: 40px;
}
</style>
