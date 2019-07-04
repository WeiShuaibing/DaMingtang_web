<template>
  <div>
    <div style="height: 10px;"></div>
    <div style="margin-bottom: 10px;height: 40px;">
      <!--最上边的保存按钮和返回按钮-->
      <el-col :span="2">
        <el-button style="width: 120px" type="primary" icon="el-icon-back" @click="rebackToSellList()">返 回</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width: 120px" :saveloading="false" type="success" icon="el-icon-check" @click="saveAllData()">确定修改</el-button>
      </el-col>
    </div>
    <div class="jichu_info" style="clear: both;">
      <!--基础属性-->
      <el-row>
        <el-col :span="2"><div class="title_word">出货单编号:</div></el-col>
        <el-col :span="3"><el-input v-model="sell_num" placeholder="..."  disabled></el-input></el-col>
        <el-col :span="2"><div class="title_word">订单编号:</div></el-col>
        <el-col :span="3">
          <el-autocomplete
            disabled=""
            v-model="or_num"
            :fetch-suggestions="queryOrderNums"
            placeholder="请输入内容"
            @select="handleOrderNumSelect"
          ></el-autocomplete>
          <!--<el-input v-model="or_num" placeholder="请输入订单编号..."></el-input>-->
        </el-col>
        <el-col  :span="2"><div class="title_word">发货日期:</div></el-col>
        <el-col :span="3">
          <el-date-picker v-model="sell_date" value-format="yyyy-MM-dd" type="date" placeholder="发货日期"></el-date-picker>
        </el-col>
        <el-col :span="2"><div class="title_word">车牌:</div></el-col>
        <el-col :span="4"><el-input v-model="car_number" placeholder="请输入车牌..."></el-input></el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="2"><div class="title_word">随车电话:</div></el-col>
        <el-col :span="3"><el-input v-model="car_tel" placeholder="请输入随车电话..."></el-input></el-col>
        <el-col  :span="2"><div class="title_word">总金额(实):</div></el-col>
        <el-col :span="3">
          <el-input v-model="total_money" placeholder="总金额(实)..."></el-input>
        </el-col>
        <el-col :span="2"><div class="title_word">总金额(虚):</div></el-col>
        <el-col :span="3">
          <el-input v-model="total_money_xu" placeholder="总金额(虚)..."></el-input>
        </el-col>
        <el-col  :span="2"><div class="title_word">做账金额:</div></el-col>
        <el-col :span="3">
          <el-input v-model="make_money" placeholder="做账金额..."></el-input>
        </el-col>

      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col  :span="2"><div class="title_word">运费:</div></el-col>
        <el-col :span="2">
          <el-input v-model="freight" placeholder="运费..."></el-input>
        </el-col>
        <el-col  :span="2"><div class="title_word">是否虚方:</div></el-col>
        <el-col :span="2">
          <el-select v-model="is_xu" placeholder="请选择">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><div class="title_word">备注:</div></el-col>
        <el-col :span="11">
          <el-input v-model="sell_remark" placeholder="请输入备注..."></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="litter_title">物料明细:</div>
    <div class="wuliao_detail">
      <el-table
        border
        ref="singleTable"
        :data="ma_detail_list"
        height="250px"
        highlight-current-row
        @current-change="handleCurrentChangeMaterialDetail"
        style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="ma_detail_id" label="物料明细编号" width="150px"></el-table-column>
        <el-table-column property="ma_name" label="名称"></el-table-column>
        <el-table-column property="ma_dingdanshu" label="订单数量" width="120px"></el-table-column>
        <!--<el-table-column property="ma_yifahuo" label="已发货数" width="120px"></el-table-column>-->
        <el-table-column property="ma_danjia" label="单价" width="120px"></el-table-column>
        <el-table-column property="ma_jiagongfei" label="加工费" width="120px"></el-table-column>
      <!--  <el-table-column property="ma_high" label="本次发货数" width="80"></el-table-column>
        <el-table-column property="ma_high" label="贷款金额" width="80"></el-table-column>
        <el-table-column property="ma_high" label="总金额" width="80"></el-table-column>-->
        <el-table-column property="ma_unit" label="单位" width="150"></el-table-column>
        <el-table-column property="ma_detail_remark" label="备注"></el-table-column>
      </el-table>
      <div style="margin-top: 2px">
        <el-button icon="el-icon-edit" size="small" @click="editMaterialDetail()"></el-button>
        <!--物料明细 "修改" start ------------------------------------------------------------->
        <el-dialog title="修改物料明细" :visible.sync="maDetailFormVisible">
          <el-form ref="form" :model="material_form" label-width="120px">
            <el-form-item label="物料编号">
              <el-input disabled v-model="material_form.ma_num"></el-input>
            </el-form-item>
            <el-form-item label="物料名称">
              <el-input disabled v-model="material_form.ma_name"></el-input>
            </el-form-item>
            <el-form-item label="已发货数">
              <el-input placeholder="请输入已发货数" v-model="material_form.ma_yifahuo"></el-input>
            </el-form-item>
            <el-form-item label="单价">
              <el-input placeholder="请输入单价" v-model="material_form.ma_danjia"></el-input>
            </el-form-item>
            <el-form-item label="加工费">
              <el-input placeholder="请输入加工费" v-model="material_form.ma_jiagongfei"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="material_form.ma_detail_remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editMateialFormVisibleReback()">取 消</el-button>
            <el-button type="primary" @click="edit_material_detail_ensure()">确 定</el-button>
          </div>
        </el-dialog>
        <!--物料明细修改 end ------------------------------------------------------------------->
      </div>
    </div>
    <!-- 加工汇总 -->
    <div class="litter_title">加工汇总:</div>
    <div  class="jiagong_huizong">
      <el-table
        border
        ref="singleTable"
        :data="huizong_list"
        height="200px"
        highlight-current-row
        style="width: 100%">
        <el-table-column property="ban_num" label="板号"></el-table-column>
        <el-table-column property="seq" label="加工工序"></el-table-column>
        <el-table-column property="word_name" label="加工名称"></el-table-column>
        <el-table-column property="order_num" label="订单数"></el-table-column>
        <!--<el-table-column property="detail_remark" label="已生产"></el-table-column>
        <el-table-column property="detail_remark" label="已发货"></el-table-column>
        <el-table-column property="detail_remark" label="代发货"></el-table-column>-->
        <el-table-column property="word_unitprice" label="加工单价"></el-table-column>
        <el-table-column property="jiagongjine" label="加工金额"></el-table-column>
        <el-table-column property="word_valuation" label="计价方式"></el-table-column>
      </el-table>
    </div>
    <!--尺寸明细和加工汇总-->
    <div>
      <div style="float: left;width: 60%">
        <div class="litter_title">尺寸明细:</div>
        <div class="size_detail">
          <el-table
            border
            ref="singleTable"
            :data="size_detail_list_filter"
            height="250px"
            highlight-current-row
            @current-change="handleCurrentChangeSizeDetail"
            style="width: 100%">
            <!--<el-table-column type="index" :index="sizeIndexMethod" width="50"></el-table-column>-->
            <!--<el-table-column property="ma_detail_id" label="ID"  width="50"></el-table-column>-->
            <el-table-column label="板号" property="ban_num"  width="100"></el-table-column>
            <el-table-column property="long_" label="长度"  width="80"></el-table-column>
            <el-table-column property="wide_" label="宽度"  width="80"></el-table-column>
            <el-table-column property="long_xu" label="长度(虚)"  width="100"></el-table-column>
            <el-table-column property="wide_xu" label="宽度(虚)"  width="100"></el-table-column>
            <el-table-column property="size_area" label="面积"  width="120"></el-table-column>
            <el-table-column property="order_num" label="订单数"  width="100"></el-table-column>
            <el-table-column property="send_goods" label="出货量"  width="100"></el-table-column>
            <!-- <el-table-column property="ma_name" label="已生产"  width="80"></el-table-column>
             <el-table-column property="ma_name" label="已发货"  width="80"></el-table-column>
             <el-table-column property="ma_name" label="未发货"  width="80"></el-table-column>-->
            <el-table-column property="size_remark" label="备注"  ></el-table-column>
          </el-table>
          <div style="margin-top: 2px;height: 40px;">
            <!--<el-button icon="el-icon-plus" size="small" @click="addSizelDetailFormuButton()"></el-button>-->
            <el-button icon="el-icon-edit" size="small" @click="editSizeSendGoods()"></el-button>
            <!--<el-button icon="el-icon-delete" size="small" @click="deleteSizeDetail()"></el-button>-->
          </div>
        </div>
      </div>
      <!--尺寸明细 "添加" start ----------------------------------------------------------------------------->
      <el-dialog title="修改已出货数" :visible.sync="sizelDetailFormVisible">
        <el-form ref="form" :model="size_form" label-width="120px">
          <el-form-item label="已出货数：">
            <el-input v-model="size_form.send_goods"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="addMaterialDetailFormVisible = false">取 消</el-button>-->
          <el-button @click="sizeFormVisibleCancel()">取 消</el-button>
          <el-button type="primary" @click="size_detail_ensure()">确 定</el-button>
        </div>
      </el-dialog>
      <!--尺寸明细添加 end --------------------------------------------------------------------->

      <!--加工明细-->
      <div style="float: right;width: 40%;">
        <div class="litter_title">加工明细:</div>
        <div class="word_detail">
          <el-table
            border
            ref="singleTable"
            :data="working_detail_list_filter"
            height="250px"
            highlight-current-row
            @current-change="handleCurrentChangeWorkDetail"
            style="width: 100%">
            <el-table-column property="ban_num" :column-key="'ban_num'" label="板号"  width="100"></el-table-column>
            <el-table-column property="seq" label="工序"  width="100"></el-table-column>
            <el-table-column property="word_name" label="加工名称"  width="150"></el-table-column>
            <el-table-column property="word_valuation" label="计价方式"  width="100"></el-table-column>
            <el-table-column property="word_position" label="加工部位"  width="100"></el-table-column>
            <el-table-column property="word_number" label="加工数量"  width="100"></el-table-column>
            <el-table-column property="word_unitprice" label="生产单价"  width="100"></el-table-column>
            <el-table-column property="word_remark" label="备注"></el-table-column>
          </el-table>
          <div style="margin-top: 2px;height: 30px;">
            <!--<el-button icon="el-icon-edit" size="small" @click="editWorkingDetail()"></el-button>-->
          </div>

          <!--加工明细 "添加" start ----------------------------------------------------------------------------->
          <el-dialog title="创建加工明细" :visible.sync="workingDetailFormVisible">
            <el-form ref="form" :model="working_form" label-width="120px">
              <el-form-item label="加工工序：">
                <el-input v-model="working_form.seq"></el-input>
              </el-form-item>
              <el-form-item label="加工工序名称：">
                <el-input v-model="working_form.word_name"></el-input>
              </el-form-item>
              <el-form-item label="计价方式：">
                <el-input v-model="working_form.word_valuation"></el-input>
              </el-form-item>
              <el-form-item label="加工部位：">
                <el-select v-model="working_form.word_position" placeholder="请选择加工部位">
                  <el-option label="长边" value="长边"></el-option>
                  <el-option label="宽边" value="宽边"></el-option>
                  <el-option label="长边+宽边" value="长边+宽边"></el-option>
                  <el-option label="长边 x 2" value="长边 x 2"></el-option>
                  <el-option label="宽边 x 2" value="宽边 x 2"></el-option>
                  <el-option label="长边 x 2 + 框边" value="长边 x 2 + 框边"></el-option>
                  <el-option label="框边 x 2 + 长边" value="框边 x 2 + 长边"></el-option>
                  <el-option label="（框边+长边）x 2" value="（框边+长边）x 2"></el-option>
                  <el-option label="自定义" value="自定义"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="加工数量：">
                <el-input v-model="working_form.word_number"></el-input>
              </el-form-item>
              <el-form-item label="生产单价(工人)：">
                <el-input v-model="working_form.word_unitprice"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="working_form.word_remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="workFormVisibleCancel()">取 消</el-button>
              <el-button type="primary" @click="work_detail_ensure()">确 定</el-button>
            </div>
          </el-dialog>
          <!--加工明细添加 end --------------------------------------------------------------------->

        </div>
      </div>
    </div>
    <div style="width: 100%;height: 100px;clear: both"></div>

  </div>
</template>

<script>
export default {
  name: 'OutEdit',
  props: [
    'outorderId'
  ],
  data () {
    return {
      sell_num: '',
      or_num: '',
      sell_date: '',
      car_number: '',
      car_tel: '',
      total_money: 0,
      total_money_xu: 0,
      make_money: 0,
      freight: 0,
      is_xu: '是',
      sell_remark: '',

      order: {}, // 根据订单号查询到的订单信息

      order_num_selected: [], // 待选的订单号
      material_form: {
        ma_detail_id: '',
        ma_dingdanshu: 0,
        ma_num: '',
        ma_name: '',
        ma_yifahuo: '',
        ma_danjia: '',
        ma_jiagongfei: '',
        ma_detail_remark: ''
      },
      ma_detail_list: [],
      current_ma_detail_selected: {}, // 当前选择的物料明细
      maDetailFormVisible: false, // 物料明细修改框是否可见
      current_size_detail_selected: {}, // 当前选择的尺寸明细
      size_detail_list: [], // 尺寸明细总数组
      size_detail_list_filter: [], // 尺寸明细数据的过滤显示
      sizelDetailFormVisible: false, // 尺寸明细编辑保单的是否可见
      size_form: {
        send_goods: 0
      }, // 尺寸表单

      huizong_list: [], // 加工汇总的列表

      workingDetailFormVisible: false, // 加工详情表单是否可见
      working_detail_list: [], // 加工明细数组
      working_detail_list_filter: [],
      working_form: {} // 加工表单
    }
  },
  created: function () {
    // this.initSellNum()
    this.init_Outorder_info()
  },
  watch: {
    current_ma_detail_selected: function () {
      this.rebuild_size_detail_list_filter()
    },
    current_size_detail_selected: function () {
      this.rebuild_working_de_list_filter()
      this.rebuild_huizong_list()
    }
  },
  methods: {
    editSizeSendGoods () {
      if (this.isEmptyObject(this.current_size_detail_selected)) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      } else {
        this.sizelDetailFormVisible = true
      }
    },
    editMateialFormVisibleReback () {
      this.maDetailFormVisible = false
    },
    edit_material_detail_ensure () {
      this.maDetailFormVisible = false
      // console.log(this.material_form)
      // 修改ma_detail_list中的属性值
      this.ma_detail_list.forEach((item, index, arr) => {
        if (item.ma_detail_id === this.material_form.ma_detail_id) {
          item.ma_yifahuo = this.material_form.ma_yifahuo
          item.ma_danjia = this.material_form.ma_danjia
          item.ma_jiagongfei = this.material_form.ma_jiagongfei
          item.ma_detail_remark = this.material_form.ma_detail_remark + ' '
        }
      })
    },
    rebuild_huizong_list () {
      // 生成加工汇总的数据
      this.huizong_list = []
      this.working_detail_list.forEach((item, index, arr) => {
        if (item.ban_num === this.current_size_detail_selected.ban_num) {
          this.huizong_list.push({
            ban_num: item.ban_num,
            seq: item.seq,
            word_name: item.word_name,
            order_num: this.current_size_detail_selected.order_num * item.word_number,
            word_unitprice: item.word_unitprice,
            jiagongjine: this.current_size_detail_selected.order_num * item.word_number * item.word_unitprice,
            word_valuation: item.word_valuation
          })
        }
      })
    },
    rebuild_working_de_list_filter () {
      this.working_detail_list_filter = []
      for (var i = 0; i < this.working_detail_list.length; i++) {
        if (this.current_size_detail_selected.ban_num === this.working_detail_list[i].ban_num) {
          if (this.working_detail_list_filter.indexOf(this.working_detail_list[i]) === -1) {
            this.working_detail_list_filter.push(this.working_detail_list[i])
          }
        }
      }
    },
    rebuild_size_detail_list_filter () {
      this.size_detail_list_filter = []
      for (var i = 0; i < this.size_detail_list.length; i++) {
        if (this.current_ma_detail_selected.ma_detail_id === this.size_detail_list[i].ma_detail_id) {
          if (this.size_detail_list_filter.indexOf(this.size_detail_list[i] === -1)) {
            this.size_detail_list_filter.push(this.size_detail_list[i])
          }
        }
      }
    },
    work_detail_ensure () {
      console.log('确定workingForm')
    },
    workFormVisibleCancel () {
      console.log('取消workingForm')
    },
    editWorkingDetail () {
      console.log('编辑加工明细按钮 ！！!')
    },
    handleCurrentChangeWorkDetail () {
      console.log('处理当前加工明细的选择变化')
    },
    size_detail_ensure () {
      // 修改出货数，并将出货数发送到后端存储起来
      this.size_detail_list.forEach((item, index, arr) => {
        if (this.current_size_detail_selected.size_id === item.size_id) {
          item.send_goods = this.size_form.send_goods
          this.axios.get(this.GLOBAL.BASE_URL + '/order/updateSizeSendGoods?size_id=' + item.size_id + '&send_goods=' + item.send_goods)
            .then(res => {
              if (res.data.code === 20000) {
                this.$message.success('出货量修改成功')
                this.sizelDetailFormVisible = false
              } else {
                this.$message.error('出货量修改失败')
              }
            })
        }
      })
    },
    sizeFormVisibleCancel () {
      this.sizelDetailFormVisible = false
    },
    editSizeDetail () {
      console.log('编辑尺寸明细逻辑')
    },
    handleCurrentChangeSizeDetail (currentRow) {
      this.current_size_detail_selected = currentRow
    },
    editMaterialDetail () {
      if (this.isEmptyObject(this.current_ma_detail_selected)) {
        this.$message({
          message: '请点击某一行物料明细选择物料',
          type: 'warning'
        })
      } else {
        this.maDetailFormVisible = true
        // 将用户当前选择的数据复制到material_form里面
        this.material_form.ma_detail_id = this.current_ma_detail_selected.ma_detail_id
        this.material_form.ma_dingdanshu = this.current_ma_detail_selected.ma_dingdanshu
        this.material_form.ma_num = this.current_ma_detail_selected.ma_num
        this.material_form.ma_name = this.current_ma_detail_selected.ma_name
        this.material_form.ma_yifahuo = this.current_ma_detail_selected.ma_yifahuo
        this.material_form.ma_danjia = this.current_ma_detail_selected.ma_danjia
        this.material_form.ma_jiagongfei = this.current_ma_detail_selected.ma_jiagongfei
        this.material_form.ma_detail_remark = this.current_ma_detail_selected.ma_detail_remark
      }
    },
    handleCurrentChangeMaterialDetail (currentRow) {
      this.current_ma_detail_selected = currentRow
    },
    handleOrderNumSelect () {
      // 处理用户选择的数据，选择后开始根据ma_num查询详情material
      this.axios.get(this.GLOBAL.BASE_URL + '/order/selectOrderByOr_num?or_num=' + this.or_num)
        .then(res => {
          if (res.data.code === 20000) {
            this.order = res.data.data // 拿到订单号对应的订单
            // 然后开始根据订单号去拿物料明细，尺寸明细，加工明细
            this.init_ma_size_word_detail()
          }
        })
    },
    init_Outorder_info () {
      // 拿到了出货单的id然后开始加载出货单基本信息，然后根据基本信息中的订单号来加载订单信息
      this.axios.get(this.GLOBAL.BASE_URL + '/outorder/findOutOrderById?id=' + this.outorderId)
        .then(res => {
          if (res.data.code === 20000) {
            let re = res.data.data
            this.sell_num = re.sell_num
            this.or_num = re.or_num
            this.sell_date = re.sell_date
            this.car_number = re.car_number
            this.car_tel = re.car_tel
            this.total_money = re.total_money
            this.total_money_xu = re.total_money_xu
            this.make_money = re.make_money
            this.freight = re.freight
            this.is_xu = re.is_xu
            this.sell_remark = re.sell_remark
            // 加下来加载订单信息
            this.init_ma_size_word_detail()
          } else {
            this.$message.error('未查询到数据')
          }
        })
    },
    init_ma_size_word_detail () {
      this.axios.get(this.GLOBAL.BASE_URL + '/order/selectMaterialSizeWork?or_num=' + this.or_num)
        .then(res => {
          this.ma_detail_list = res.data.data.ma_detail_list // 这个有问题，不应该从这里查
          this.size_detail_list = res.data.data.size_detail_list

          console.log('--------------<<<<<<<<>>>>>>>-------')
          console.log(this.size_detail_list)
          this.working_detail_list = res.data.data.word_detail_list
          // 在获取了物料信息（订单添加的物料的id）后，再次跟进物料id去查询出物料编号，物料名称，单位
          this.ma_detail_list.forEach((item, index, arr) => {
            // 给ma_detail_list添加新的字段信息，因为从后端传来的不包括现在需要的字段
            /* item.ma_yifahuo = '0' // 这三个字段在编辑详情页面是需要从后端查询的
            item.ma_danjia = '0'
            item.ma_jiagongfei = '0.0' */
            this.axios.get(this.GLOBAL.BASE_URL + '/outorder/selectOutMaDetailByMa_detail_id?ma_detail_id=' + item.ma_detail_id + '&sell_num=' + this.sell_num)
              .then(res => {
                if (res.data.code === 20000) {
                  item.ma_yifahuo = res.data.data.ma_yifahuo
                  item.ma_danjia = res.data.data.ma_danjia
                  item.ma_jiagongfei = res.data.data.ma_jiagongfei
                  item.ma_detail_remark = res.data.data.out_ma_remark
                } else {
                  this.$message.error('部分物料明细信息加载失败！！！')
                }
              })
            this.axios.get(this.GLOBAL.BASE_URL + '/material/selectMaterialByMaNum?ma_num=' + item.ma_num)
              .then(res => {
                item.ma_name = res.data.data.ma_name
                item.ma_unit = res.data.data.ma_unit
              })
          })
          // 获取完尺寸信息后，遍历一遍来计算面积
          this.size_detail_list.forEach((item, index, arr) => {
            item.size_area = (item.long_ / 1000) * (item.wide_ / 1000) * item.order_num
            item.size_area = parseFloat(item.size_area.toFixed(3))
          })
        })
    },
    queryOrderNums (queryString, cb) {
      this.axios.get(this.GLOBAL.BASE_URL + '/order/findMatchingOr_num?or_num=' + queryString)
        .then(res => {
          this.order_num_selected = []
          this.order_num_selected = res.data.data
          cb(this.order_num_selected)
        })
        .catch(() => {
          this.$message.error('订单编号加载失败')
        })
    },
    initSellNum () {
      // let date = new Date()
      // this.sell_num = 'ch' + date.getUTCFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
    },
    rebackToSellList () {
      this.$emit('changeMain', ['OutList'])
    },
    isEmptyObject (obj) {
      for (var key in obj) {
        return false
      };
      return true
    },
    saveAllData () {
      if (this.or_num === '') {
        this.$message.error('订单号没填哦')
      } else {
        // 只用保存出货单中的上部分的出货信息和物料明细中新的信息
        this.axios.post(this.GLOBAL.BASE_URL + '/outorder/updateSellAndOutMaDetail', {
          // 这里应该将用户修改的数据，即出货单的基础数据和物料明细的基础数据进行修改
          sell_id: this.outorderId,
          sell_num: this.sell_num,
          or_num: this.or_num,
          sell_date: this.sell_date,
          car_number: this.car_number,
          car_tel: this.car_tel,
          total_money: this.total_money,
          total_money_xu: this.total_money_xu,
          make_money: this.make_money,
          freight: this.freight,
          is_xu: this.is_xu,
          sell_remark: this.sell_remark,
          ma_detail_list: this.ma_detail_list
        })
          .then(res => {
            if (res.data.code === 20000) {
              this.$message.success('数据更新成功')
              this.$emit('changeMain', ['OutList'])
            } else {
              this.$message.error('数据更新失败失败 ！！！')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  .jiagong_huizong{
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24);
    background-color: lightskyblue;
    height: 200px;
  }
  .title_word{
    font-size: 16px;
    line-height: 40px;
  }
  .jichu_info{

    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24);
  }
  .wuliao_detail{
    padding-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24);
  }
  .litter_title{
    margin-top: 10px;
    margin-left: 10px;
    text-align: left;
    line-height: 2;
  }
  .size_detail{
    /*background-color: lightskyblue;*/
    /*height: 250px;*/
    margin-left: 5px;
    margin-right: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24);
  }
  .word_detail{
    /*background-color: lightgoldenrodyellow;*/
    /*height: 250px;*/
    /*margin-left: 5px;*/
    margin-right: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24);
  }
  .test{
    background-color: red;
  }
</style>
