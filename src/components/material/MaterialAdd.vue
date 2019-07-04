<template>
    <div>
      <div style="height: 20px;">
        <!--<el-button type="primary" icon="el-icon-arrow-left">返回</el-button>-->
      </div>
      <el-row class="col_row">
        <el-col :span="3"><div class="title_word">物料编号:<span style="color: red;">*</span></div></el-col>
        <el-col :span="5"><div>
          <el-input v-model="ma_num" placeholder="请输入物料编号"  disabled=""></el-input>
        </div></el-col>
        <el-col :span="3"><div class="title_word">物料名称:<span style="color: red;">*</span></div></el-col>
        <el-col :span="5"><div><el-input  v-model="ma_name" placeholder="请输入物料名称"></el-input></div></el-col>
        <el-col :span="2"><div class="title_word">等级:</div></el-col>
        <el-col :span="2">
          <div>
            <el-select v-model="ma_grade" placeholder="请选择">
              <el-option key="a" label="A" value="A"></el-option>
              <el-option key="b" label="B" value="B"></el-option>
              <el-option key="ha" label="HA" value="HA"></el-option>
              <el-option key="h2a" label="H2A" value="H2A"></el-option>
              <el-option key="h2" label="H2" value="H2"></el-option>
              <el-option key="h3" label="H3" value="H3"></el-option>
              <el-option key="hadahuang" label="HA大黄" value="HA大黄"></el-option>
              <el-option key="hazhonghuang" label="HA中黄" value="HA中黄"></el-option>
              <el-option key="haqianhuang" label="HA浅黄" value="HA浅黄"></el-option>
              <el-option key="h2dahuang" label="H2大黄" value="H2大黄"></el-option>
              <el-option key="h2zhonghuang" label="H2中黄" value="H2中黄"></el-option>
              <el-option key="h2qianhuang" label="H2浅黄" value="H2浅黄"></el-option>
              <el-option key="hajindianhuang" label="HA金点黄" value="HA金点黄"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="col_row">
        <el-col :span="3"><div class="title_word">长(mm):</div></el-col>
        <el-col :span="1">
          <div>
            <el-input placeholder="长" v-model="ma_long" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
          </div>
        </el-col>
        <el-col :span="2"><div class="title_word">宽(mm):</div></el-col>
        <el-col :span="1">
          <div>
            <el-input placeholder="宽" v-model="ma_wide" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
          </div>
        </el-col>
        <el-col :span="2"><div class="title_word">高(mm):</div></el-col>
        <el-col :span="1">
          <div>
            <el-input placeholder="高" v-model="ma_high" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
          </div>
        </el-col>
        <el-col :span="3"><div class="title_word">面积(m*m):</div></el-col>
        <el-col :span="1">
          <div>
            <el-input placeholder="物料高度" disabled v-model="ma_area"></el-input>
          </div>
        </el-col>
        <el-col :span="3"><div class="title_word">体积(m*m*m):</div></el-col>
        <el-col :span="1">
          <div>
            <el-input placeholder="物料高度" disabled v-model="ma_volume"></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row class="col_row">
        <el-col :span="3"><div class="title_word">默认售价:</div></el-col>
        <el-col :span="2"><div>
          <el-input v-model="ma_price" placeholder="请输入默认售价"></el-input>
        </div></el-col>
        <el-col :span="2"><div class="title_word">虚拟物品:</div></el-col>
        <el-col :span="2">
          <el-select v-model="ma_invented" placeholder="请选择">
            <el-option key="shi" value="是"></el-option>
            <el-option key="fou"  value="否"></el-option>
          </el-select>
        </el-col>

        <el-col :span="3"><div class="title_word">板材类型:<span style="color: red;">*</span></div></el-col>
        <el-col :span="2">
          <div>
            <el-select v-model="ma_bancai_type" placeholder="请选择">
              <el-option key="huagangyan" value="花岗岩"></el-option>
              <el-option key="dalishi"  value="大理石"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="2"><div class="title_word">单位:<span style="color: red;">*</span></div></el-col>
        <el-col :span="2">
          <div>
            <el-select v-model="ma_unit" placeholder="请选择">
              <el-option key="pian" value="片"></el-option>
              <el-option key="pingfangmi"  value="平方米"></el-option>
              <el-option key="lifangmi"  value="立方米"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row class="col_row">
        <el-col :span="3"><div class="title_word">属性:<span style="color: red;">*</span></div></el-col>
        <el-col :span="3">
          <el-select v-model="ma_attribute" placeholder="请选择">
            <el-option v-for="(item, index) in ma_attributes" v-bind:key="index" v-bind:value="item.name"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2" :offset="2"><div class="title_word">物料类别:<span style="color: red;">*</span></div></el-col>
        <el-col :span="4">
          <el-autocomplete
            class="inline-input"
            v-model="ma_wuliao_type_code"
            :fetch-suggestions="materialCodeFilter"
            placeholder="请输入类别缩写"
            :trigger-on-focus="false"
            @select="handleSelectOfTypeCode"
          ></el-autocomplete>
        </el-col>
        <el-col :span="2" :offset="1"><div class="title_word">毛重(g):</div></el-col>
        <el-col :span="2"><div>
          <el-input v-model="ma_weight" placeholder="毛重(g)" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
        </div></el-col>
      </el-row>
      <el-row class="col_row">
        <el-col :span="3"><div class="title_word">备注：</div></el-col>
        <el-col :span="14">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3}"
            placeholder="请输入内容"
            v-model="ma_remark">
          </el-input>
        </el-col>
      </el-row>

      <div style="margin-top: 50px;">
        <el-button type="primary" icon="el-icon-arrow-left" style="width: 150px;" @click="returnList()">返回</el-button>
        <el-button type="success" @click="submitData()" style="width: 150px;" :loading="submitLoading">提   交</el-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MaterialAdd',
  data () {
    return {
      ma_grade: 'A',
      ma_num: '',
      ma_name: '',
      ma_long: 0,
      ma_wide: 0,
      ma_high: 0,
      ma_area: 0,
      ma_volume: 0,
      ma_price: 0.0,
      ma_attribute: '',
      ma_wuliao_type: '',
      ma_bancai_type: '花岗岩',
      ma_unit: '片',
      ma_invented: '否',
      ma_remark: '',
      ma_weight: 0,
      ma_attributes: [], // 所有的属性信息
      ma_wuliao_types: [], // 所有的物料类别信息
      ma_wuliao_type_filter: [], // 过滤后的物料类别信息
      ma_wuliao_type_code: '',
      submitLoading: false // 按钮状态
    }
  },
  watch: {
    ma_long (val, oldval) {
      this.ma_area = (val / 1000) * (this.ma_wide / 1000)
      this.ma_volume = (val / 1000) * (this.ma_wide / 1000) * (this.ma_high / 1000)
    },
    ma_wide (val, oldval) {
      this.ma_area = (val / 1000) * (this.ma_long / 1000)
      this.ma_volume = (val / 1000) * (this.ma_long / 1000) * (this.ma_high / 1000)
    },
    ma_high (val, oldval) {
      this.ma_volume = (val / 1000) * (this.ma_long / 1000) * (this.ma_wide / 1000)
    }
  },
  created: function () {
    this.queryAttributes()
    this.queryMaterialTypy()
  },
  methods: {
    returnList () {
      this.$emit('changeMain', ['MaterialList'])
    },
    submitData () {
      if (this.ma_name === '' || this.ma_bancai_type === '' || this.ma_unit === '' || this.ma_attribute === '' || this.ma_wuliao_type === '') {
        this.$message({
          message: '警告哦，带有红 * 的为必填项哦 ！',
          type: 'warning'
        })
      } else {
      //  提交数据
        this.sendData()
      }
    },
    materialCodeFilter (queryString, cb) {
      // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      var results = this.ma_wuliao_types.filter(item => {
        return item.value.search(queryString) !== -1
      })
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    queryMaterialTypy () {
      this.axios.get(this.GLOBAL.BASE_URL + '/material/selectMaterialType')
        .then(res => {
          if (res.data.code === 20000) {
            this.ma_wuliao_types = res.data.data
          } else {
            this.$notify.error({
              title: '警告',
              message: ' ！！！'
            })
          }
        })
    },
    handleSelectOfTypeCode (item) {
      // this.ma_num = item.value.split('-')[0] + Math.ceil(Math.random() * 1000) + Math.ceil(Math.random() * 1000)
      let date = new Date()
      this.ma_num = item.value.split('-')[0] + date.getUTCFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      this.ma_wuliao_type = item.value
    },
    queryAttributes () {
      this.axios.get(this.GLOBAL.BASE_URL + '/material/selectAttribute')
        .then(res => {
          if (res.data.code === 20000) {
            this.ma_attributes = res.data.data
          } else {
            this.$notify.error({
              title: '警告',
              message: ' 物料属性 信息加载失败 ！！！'
            })
          }
        })
    },
    sendData () {
      this.submitLoading = true
      this.axios.post(this.GLOBAL.BASE_URL + '/material/insertMaterial', {
        ma_num: this.ma_num,
        ma_name: this.ma_name,
        ma_grade: this.ma_grade,
        ma_long: this.ma_long,
        ma_wide: this.ma_wide,
        ma_high: this.ma_high,
        ma_area: this.ma_area,
        ma_volume: this.ma_volume,
        ma_price: this.ma_price,
        ma_invented: this.ma_invented,
        ma_bancai_type: this.ma_bancai_type,
        ma_unit: this.ma_unit,
        ma_attribute: this.ma_attribute,
        ma_wuliao_type: this.ma_wuliao_type,
        ma_weight: this.ma_weight,
        ma_remark: this.ma_remark
      }).then(res => {
        if (res.data.code === 20000) {
          this.$emit('changeMain', ['MaterialList'])
        } else {
          this.submitLoading = false
          this.$message({
            message: '数据提交异常',
            type: 'warning'
          })
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
    /*margin-top: 25px;*/
  }
  .col_row{
    margin-top: 25px;
  }

</style>
