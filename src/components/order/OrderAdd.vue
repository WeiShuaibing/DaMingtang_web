<template>
    <div>
      <div style="height: 10px;"></div>
      <div style="margin-bottom: 10px;height: 40px;">
        <!--最上边的保存按钮和返回按钮-->
        <el-col :span="2">
          <el-button style="width: 120px" type="primary" icon="el-icon-back" @click="rebackToOrderList()">返 回</el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="width: 120px" :saveloading="false" type="success" icon="el-icon-check" @click="saveAllData()">保 存</el-button>
        </el-col>
      </div>
      <div class="jichu_info" style="clear: both;">
        <!--基础属性-->
        <el-row>
          <el-col :span="2"><div class="title_word">订单编号:</div></el-col>
          <el-col :span="3"><el-input v-model="or_num" placeholder="请输入订单编号..."  disabled=""></el-input></el-col>
          <el-col :span="2"><div class="title_word">客户:</div></el-col>
          <el-col :span="3">
            <el-input v-model="custom" placeholder="请输入客户..."></el-input>
          </el-col>
          <el-col :span="2"><div class="title_word">工程号:</div></el-col>
          <el-col :span="4">
            <el-input v-model="project_num" placeholder="请输入工程号..."></el-input>
          </el-col>
          <el-col :span="2"><div class="title_word">联系电话:</div></el-col>
          <el-col :span="4">
            <el-input v-model="telephone" oninput = "value=value.replace(/[^\-?\d.]/g,'')" placeholder="请输入联系电话..."></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px;">
          <el-col  :span="2"><div class="title_word">下单日期:</div></el-col>
          <el-col :span="3">
            <el-date-picker v-model="place_order_date" value-format="yyyy-MM-dd" type="date" placeholder="下单日期"></el-date-picker>
          </el-col>
          <el-col :span="2"><div class="title_word">预交日期:</div></el-col>
          <el-col :span="3">
            <el-date-picker v-model="hand_order_date" value-format="yyyy-MM-dd"  type="date" placeholder="预交日期"></el-date-picker>
          </el-col>
          <el-col  :span="2"><div class="title_word">业务员:</div></el-col>
          <el-col :span="2">
            <el-input v-model="saleman" placeholder="请输入业务员..."></el-input>
          </el-col>
          <el-col  :span="2"><div class="title_word">经手人:</div></el-col>
          <el-col :span="2">
            <el-input v-model="handler" placeholder="请输入经手人..."></el-input>
          </el-col>
          <el-col  :span="2"><div class="title_word">接收人:</div></el-col>
          <el-col :span="2">
            <el-input v-model="receiver" placeholder="请输入接收人..."></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px;">
          <el-col :span="2"><div class="title_word">目的地:</div></el-col>
          <el-col :span="8">
            <el-input v-model="destination" placeholder="请输入目的地..."></el-input>
          </el-col>
          <el-col :span="2"><div class="title_word">备注:</div></el-col>
          <el-col :span="8">
            <el-input v-model="od_remark" placeholder="请输入备注..."></el-input>
          </el-col>
        </el-row>
        <!--<hr style="margin-top: 15px;">-->
      </div>
      <div class="litter_title">物料明细:</div>
      <div class="wuliao_detail">
        <!--物料明细-->
        <el-table
          ref="singleTable"
          :data="ma_detail_list"
          height="250px"
          highlight-current-row
          @current-change="handleCurrentChangeMaterialDetail"
          style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="ma_detail_id" label="ID"  width="130"></el-table-column>
          <el-table-column property="or_num" label="订单号"  width="130"></el-table-column>
          <el-table-column property="ma_num" label="物料编号"  width="150"></el-table-column>
          <el-table-column property="ma_name" label="名称"  width="180"></el-table-column>
          <el-table-column property="ma_long" label="长" width="80"></el-table-column>
          <el-table-column property="ma_wide" label="宽" width="80"></el-table-column>
          <el-table-column property="ma_high" label="高" width="80"></el-table-column>
          <el-table-column property="ma_dingdanshu" label="订单数"></el-table-column>
         <!-- <el-table-column property="address" label="已生产"></el-table-column>
          <el-table-column property="address" label="已发货"></el-table-column>
          <el-table-column property="address" label="代发货"></el-table-column>-->
          <el-table-column property="unit_price"  label="切板单价"></el-table-column>
          <!--<el-table-column property="address" label="切板金额"></el-table-column>
          <el-table-column property="address" label="生产金额"></el-table-column>
          <el-table-column property="address" label="总金额"></el-table-column>-->
          <el-table-column ma_unit="ma_unit" label="单位"></el-table-column>
          <el-table-column property="ma_invented" label="虚拟物品"></el-table-column>
          <el-table-column property="detail_remark" label="备注"></el-table-column>
        </el-table>
        <div style="margin-top: 2px">
          <el-button icon="el-icon-plus" size="small" @click="addMaterialDetailFormVisible = true"></el-button>
          <el-button icon="el-icon-edit" size="small" @click="editMaterialDetail()"></el-button>
          <el-button icon="el-icon-delete" size="small" @click="deleteMaDetail()"></el-button>

          <!--物料明细 "添加" start ------------------------------------------------------------->
          <el-dialog title="创建物料明细" :visible.sync="addMaterialDetailFormVisible">
            <el-form ref="form" :model="material_form" label-width="120px">
              <el-form-item label="物料编号">
                <!--<el-input v-model="form.name"></el-input>-->
                <el-autocomplete
                  v-model="material_form.ma_num"
                  :fetch-suggestions="queryMateriaNums"
                  placeholder="请输入内容"
                  @select="handleMaterialDetailSelect"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="物料名称">
                <el-input disabled v-model="material_form.ma_name"></el-input>
              </el-form-item>
              <el-form-item label="面积">
                <el-input disabled v-model="material_form.ma_area"></el-input>
              </el-form-item>
              <el-form-item label="体积">
                <el-input disabled v-model="material_form.ma_volume"></el-input>
              </el-form-item>
              <el-form-item label="切板单价(工人):">
                <el-input v-model="ma_detail.unit_price"></el-input>
              </el-form-item>
             <!-- <el-form-item label="已发货数:">
                <el-input disabled v-model="material_form.send_goods"></el-input>
              </el-form-item>-->
              <el-form-item label="单位：">
                <el-input disabled v-model="material_form.ma_unit"></el-input>
              </el-form-item>
              <el-form-item label="备注:">
                <el-input v-model="ma_detail.detail_remark"></el-input>
              </el-form-item>
              <el-form-item label="是否虚拟物料:">
                <el-input disabled v-model="material_form.ma_invented"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <!--<el-button @click="addMaterialDetailFormVisible = false">取 消</el-button>-->
              <el-button @click="addMateialFormVisibleFun()">取 消</el-button>
              <el-button type="primary" @click="material_detail_add()">确 定</el-button>
            </div>
          </el-dialog>
          <!--物料明细添加 end ------------------------------------------------------------------->
        </div>
      </div>
      <!--加工汇总-->
      <div class="litter_title">加工汇总:</div>
      <div  class="jiagong_huizong">
        <el-table
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
      <!--尺寸明细和加工明细-->
      <div>
        <div style="float: left;width: 60%">
          <div class="litter_title">尺寸明细:</div>
          <div class="size_detail">
            <el-table
              ref="singleTable"
              :data="size_detail_list_filter"
              height="250px"
              highlight-current-row
              @current-change="handleCurrentChangeSizeDetail"
              style="width: 100%">
              <!--<el-table-column type="index" :index="sizeIndexMethod" width="50"></el-table-column>-->
              <!--<el-table-column property="ma_detail_id" label="ID"  width="50"></el-table-column>-->
              <el-table-column label="板号" property="ban_num"  width="100"></el-table-column>
              <el-table-column property="long_" label="长度(mm)"  width="100"></el-table-column>
              <el-table-column property="wide_" label="宽度(mm)"  width="100"></el-table-column>
              <el-table-column property="long_xu" label="长度(虚)"  width="100"></el-table-column>
              <el-table-column property="wide_xu" label="宽度(虚)"  width="100"></el-table-column>
              <el-table-column property="size_area" label="面积(m*m)"  width="150"></el-table-column>
              <el-table-column property="order_num" label="订单数"  width="100"></el-table-column>
             <!-- <el-table-column property="ma_name" label="已生产"  width="80"></el-table-column>
              <el-table-column property="ma_name" label="已发货"  width="80"></el-table-column>
              <el-table-column property="ma_name" label="未发货"  width="80"></el-table-column>-->
              <el-table-column property="size_remark" label="备注"  ></el-table-column>
            </el-table>
            <div style="margin-top: 2px">
              <el-button icon="el-icon-plus" size="small" @click="addSizelDetailFormuButton()"></el-button>
              <el-button icon="el-icon-edit" size="small" @click="editSizeDetail()"></el-button>
              <el-button icon="el-icon-delete" size="small" @click="deleteSizeDetail()"></el-button>
            </div>
          </div>
        </div>
        <!--尺寸明细 "添加" start ----------------------------------------------------------------------------->
        <el-dialog title="创建尺寸明细" :visible.sync="addSizelDetailFormVisible">
          <el-form ref="form" :model="size_form" label-width="120px">
            <el-form-item label="长度：">
              <el-input v-model="size_form.long_" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="宽度：">
              <el-input v-model="size_form.wide_" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="长度(虚)：">
              <el-input v-model="size_form.long_xu" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="宽度(虚)：">
              <el-input v-model="size_form.wide_xu" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="数量：">
              <el-input v-model="size_form.order_num" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="size_form.size_remark"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <!--<el-button @click="addMaterialDetailFormVisible = false">取 消</el-button>-->
            <el-button @click="addSizeFormVisibleCancel()">取 消</el-button>
            <el-button type="primary" @click="size_detail_add()">确 定</el-button>
          </div>
        </el-dialog>
        <!--尺寸明细添加 end --------------------------------------------------------------------->

        <!--加工明细-->
        <div style="float: right;width: 40%;">
          <div class="litter_title">加工明细:</div>
          <div class="word_detail">
            <el-table
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
            <div style="margin-top: 2px">
              <el-button icon="el-icon-plus" size="small" @click="addWorkinglDetailFormButton()"></el-button>
              <el-button icon="el-icon-edit" size="small" @click="editWorkingDetail()"></el-button>
              <el-button icon="el-icon-delete" size="small" @click="deleteWorkingDetail()"></el-button>
            </div>

            <!--加工明细 "添加" start ----------------------------------------------------------------------------->
            <el-dialog title="创建加工明细" :visible.sync="addWorkingDetailFormVisible">
              <el-form ref="form" :model="working_form" label-width="120px">
                <el-form-item label="加工工序：">
                  <el-input v-model="working_form.seq" oninput = "value=value.replace(/[^\-?\d.]/g,'')" placeholder="请输入工序（数字）"></el-input>
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
                  <el-input v-model="working_form.word_number" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="生产单价(工人)：">
                  <el-input v-model="working_form.word_unitprice" oninput = "value=value.replace(/[^\-?\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="working_form.word_remark"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addWorkFormVisibleCancel()">取 消</el-button>
                <el-button type="primary" @click="work_detail_add()">确 定</el-button>
              </div>
            </el-dialog>
            <!--加工明细添加 end --------------------------------------------------------------------->

          </div>
        </div>
      </div>
      <div style="width: 100%;height: 100px;clear: both">
      </div>

    </div>
</template>

<script>
export default {
  name: 'OrderAdd',
  meta: {
    keepAlive: true // 需要被缓存
  },
  data () {
    return {
      saveloading: false,
      id: 0,
      or_num: '', // 订单编号
      custom: '',
      place_order_date: undefined,
      hand_order_date: undefined,
      receiver: '',
      telephone: '',
      handler: '',
      material_name: '',
      od_remark: '',
      project_num: '',
      destination: '',
      saleman: '',
      material_name_str: '', // 在保存的时候将所有的物料名称进行拼接保存在此
      isEdit: false,
      addMaterialDetailFormVisible: false,
      material_form: {
        ma_num: '',
        ma_name: '',
        ma_long: 0,
        ma_wide: 0,
        ma_high: 0,
        ma_area: 0,
        ma_volume: 0,
        // send_goods: 0,
        ma_unit: '', // 单位
        ma_invented: '' // 是否虚拟
      },
      ma_detail: {
        ma_dingdanshu: 0,
        // produced: 0,
        // send_goods: 0,
        // no_send_goods: 0,
        unit_price: 0, // 切板单价
        // unit_money: 0,
        // produce_money: 0,
        // total_money: 0,
        detail_remark: 0
      },
      ma_detail_list: [], // 物料明细数组，，每次添加物料明细后的信息都存入此数组中
      material_detail_num_selected: [], // 物料明细的 物料编号数组。。根据用户输入的关键字查询的数组存入此数组中
      current_ma_detail_selected: {}, //  当前用户所选择的某一行 物料明细

      // 尺寸数据
      addSizelDetailFormVisible: false,
      size_detail_list: [], // 添加的尺寸明细列表
      size_detail_list_filter: [], // 这是经过过滤的明细列表，主要是根据物料明细id进行过滤，当当前所选明细变动时进行联动需要
      size_form: {
        ban_num: 1,
        long_: 0,
        long_xu: 0,
        wide_: 0,
        wide_xu: 0,
        size_area: 0,
        order_num: 0,
        size_remark: ''
      },
      current_size_detail_selected: {}, // size_detail用户选择的
      page_ban_num: 1, // 记录整个页面的板号，不能使用size_form中的，因为size_form中的板号当修改完在添加会出现问题

      // 加工明细数据
      seqIsOk: true,
      addWorkingDetailFormVisible: false,
      working_form: {
        seq: undefined, // 工序
        word_name: '', // 加工名称
        word_valuation: '', // 计价方式
        word_position: '', // 加工部位
        word_number: 0, // 加工数量
        word_unitprice: 0, // 生产单价
        word_remark: ''
      },
      current_working_detail_selected: {},
      working_detail_list: [],
      working_detail_list_filter: [], // 存放加工明细经过过滤的数据

      // 加工汇总
      huizong_list: [] // 加工汇总集合
    }
  },
  created: function () {
    // 获取源数据
    if (sessionStorage.getItem('order_add_data') != null) {
      let data = JSON.parse(sessionStorage.getItem('order_add_data'))
      Object.assign(this, data)
    } else {
      this.createOrder_num()
    }
  },
  watch: {
    ma_detail_list: function () {
      // 当检测到数据变化了后，将数据存入session
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    working_detail_list: function () {
      // 当检测到数据变化了后，将数据存入session
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    custom: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    project_num: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    telephone: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    place_order_date: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    hand_order_date: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    handler: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    saleman: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    receiver: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    od_remark: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    destination: function () {
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    },
    current_size_detail_selected: function () {
      // 每当检测到用户切换尺寸明细的时候就重新过滤得到working_detail_list_filter的值
      this.rebuild_working_de_list_filter()
      this.create_huizong_list()
    },
    current_ma_detail_selected: function () {
      this.rebuild_size_detail_list_filter()
    },
    size_detail_list: function () {
      this.rebuild_size_detail_list_filter()
      // 当检测到数据变化了后，将数据存入session
      sessionStorage.setItem('order_add_data', JSON.stringify(this.$data))
    }
  },
  methods: {
    rebuild_ma_dingdanshu () {
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
    // 生成加工汇总的数据
    create_huizong_list () {
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
    work_detail_add () {
      // 第一步先判断新添加的加工工序是否已经存在
      if (typeof (this.working_form.seq) === 'undefined' || this.working_form.seq === '') {
        this.seqIsOk = false
      }
      if (!this.isEdit) {
        this.working_detail_list.forEach((item, index, arr) => {
          if (item.seq === this.working_form.seq && item.ban_num === this.current_size_detail_selected.ban_num) {
            // 加工工序不正常
            this.seqIsOk = false
          }
        })
      }
      if (this.seqIsOk) {
        // 在这里做一个逻辑判断是否是编辑状态，如果是编辑状态则应该修改原数组中的数据而不是push数据
        if (this.isEdit) {
          console.log('这是编辑状态，应将编辑好的数据存入数组中')

          this.working_detail_list.forEach((item, inde, arr) => {
            if (this.current_working_detail_selected.seq === item.seq &&
            this.current_working_detail_selected.ban_num === item.ban_num) {
              item.seq = this.working_form.seq
              item.word_name = this.working_form.word_name
              item.word_valuation = this.working_form.word_valuation
              item.word_position = this.working_form.word_position
              item.word_number = this.working_form.word_number
              item.word_unitprice = this.working_form.word_unitprice
              item.word_remark = this.working_form.word_remark
            }
          })
          // 编辑状态完成后首先上面将编辑好的数据填充到数组中，接下来需要将加工汇总中的数据也进行修正
          this.create_huizong_list()
          // 编辑状态完了之后将编辑状态置为false
          this.isEdit = false
          this.addWorkingDetailFormVisible = false
        } else {
          // 非修改状态，而是添加状态
          // 加工工序正常，进行添加
          this.addWorkingDetailFormVisible = false
          this.working_detail_list.push({
            // 加工明细 需要标识字段，物料唯一id 和 尺寸板号
            or_num: this.or_num,
            ban_num: this.current_size_detail_selected.ban_num,
            ma_detail_id: this.current_ma_detail_selected.ma_detail_id,
            seq: this.working_form.seq,
            word_name: this.working_form.word_name,
            word_valuation: this.working_form.word_valuation,
            word_position: this.working_form.word_position,
            word_number: this.working_form.word_number,
            word_unitprice: this.working_form.word_unitprice,
            word_remark: this.working_form.word_remark
          })

          // 计算加工汇总的数据-------------------------------
          this.create_huizong_list()
          // 将过滤的数据存放到working_detail_list_filter 中 ----------------------------- start -------------------
          this.rebuild_working_de_list_filter()
          // ----------------------------- start -------------------
        }
      } else {
        this.$message({
          message: '加工工序未填写 或加工工序重复',
          type: 'warning'
        })
        this.seqIsOk = true
      }
    },
    addWorkinglDetailFormButton () {
      if (!this.isEmptyObject(this.current_size_detail_selected)) {
        this.addWorkingDetailFormVisible = true
      } else {
        this.$message({
          message: '请 添加 或 点击 选择某一行尺寸明细',
          type: 'warning'
        })
      }
    },
    editWorkingDetail () {
      console.log('编辑加工明细')
      // 标志位置为编辑状态
      this.isEdit = true
      // 编辑加工明细，首先在显示框中填入当前用户选择的数据，加工工序不能动
      if (!this.isEmptyObject(this.current_working_detail_selected)) { // 保证用户已经选择了某一行数据
        this.addWorkingDetailFormVisible = true // 将编辑框置为可见
        this.working_form.seq = this.current_working_detail_selected.seq
        this.working_form.word_name = this.current_working_detail_selected.word_name
        this.working_form.word_valuation = this.current_working_detail_selected.word_valuation
        this.working_form.word_position = this.current_working_detail_selected.word_position
        this.working_form.word_number = this.current_working_detail_selected.word_number
        this.working_form.word_unitprice = this.current_working_detail_selected.word_unitprice
        this.working_form.word_remark = this.current_working_detail_selected.word_remark
      } else {
        this.$message({
          message: '请选择一条加工明细',
          type: 'warning'
        })
      }
    },
    deleteWorkingDetail () {
      // 删除用户所选择的加工明细
      if (!this.isEmptyObject(this.current_working_detail_selected)) {
        this.working_detail_list.forEach((item, index, arr) => {
          if (this.current_working_detail_selected.seq === item.seq &&
            this.current_working_detail_selected.ban_num === item.ban_num) {
            this.working_detail_list.splice(index, 1)
            this.rebuild_working_de_list_filter()
          }
        })
      } else {
        this.$message({
          message: '请点击选择 一行 加工明细',
          type: 'warning'
        })
      }

      // 删除加工汇总中的当前选择项x***********************************************
      this.huizong_list.forEach((item, index, arr) => {
        if (item.seq === this.current_working_detail_selected.seq) {
          this.huizong_list.splice(index, 1)
        }
      })
    },
    handleCurrentChangeWorkDetail (currentRow) {
      this.current_working_detail_selected = currentRow
    },
    sizeIndexMethod (index) {
      // console.log(999)
      // this.size_form.ban_num = index
    },
    editSizeDetail () {
      // 标志位置为编辑状态
      this.isEdit = true
      // 编辑尺寸明细 ，首先显示输入窗口，然后把源数据填进去，但不能动ban_num

      if (!this.isEmptyObject(this.current_size_detail_selected)) { // 保证用户已经选择了某一行数据
        this.addSizelDetailFormVisible = true

        this.size_form.ban_num = this.current_size_detail_selected.ban_num
        this.size_form.long_ = this.current_size_detail_selected.long_
        this.size_form.long_xu = this.current_size_detail_selected.long_xu
        this.size_form.wide_ = this.current_size_detail_selected.wide_
        this.size_form.wide_xu = this.current_size_detail_selected.wide_xu
        this.size_form.order_num = this.current_size_detail_selected.order_num
        this.size_form.size_remark = this.current_size_detail_selected.size_remark
      } else {
        this.$message({
          message: '请选择一条尺寸明细',
          type: 'warning'
        })
      }
    },
    handleCurrentChangeSizeDetail (currentRow) {
      this.current_size_detail_selected = currentRow
    },
    deleteSizeDetail () {
      console.log(this.current_size_detail_selected)
      // 删除用户所选择的物料明细
      if (!this.isEmptyObject(this.current_size_detail_selected)) {
        this.size_detail_list.forEach((item, index, arr) => {
          if (this.current_size_detail_selected.ban_num === item.ban_num) {
            this.size_detail_list.splice(index, 1)
          }
        })
      } else {
        this.$message({
          message: '请点击某一行尺寸明细选择尺寸',
          type: 'warning'
        })
        // alert('请点击某一行尺寸明细选择尺寸')
      }
    },
    addWorkFormVisibleCancel () {
      this.addWorkingDetailFormVisible = false
    },
    addSizeFormVisibleCancel () {
      this.addSizelDetailFormVisible = false
    },
    addSizelDetailFormuButton () {
      if (!this.isEmptyObject(this.current_ma_detail_selected)) {
        this.addSizelDetailFormVisible = true
      } else {
        this.$message({
          message: '请 添加 或 点击 选择某一行物料明细选择物料',
          type: 'warning'
        })
        // alert('请 添加 或 点击 选择某一行物料明细选择物料')
      }
    },
    size_detail_add () {
      this.size_form.size_area = (this.size_form.long_ / 1000) * (this.size_form.wide_ / 1000) * this.size_form.order_num
      this.size_form.size_area = parseFloat(this.size_form.size_area.toFixed(3))
      this.addSizelDetailFormVisible = false

      if (this.isEdit) {
        // 将修改过的数据修改到数组ma_detail_list中
        this.size_detail_list.forEach((item, index, arr) => {
          if (this.current_size_detail_selected.ban_num === item.ban_num) {
            item.ma_detail_id = this.current_ma_detail_selected.ma_detail_id
            item.ban_num = this.size_form.ban_num
            item.long_ = this.size_form.long_
            item.long_xu = this.size_form.long_xu
            item.wide_ = this.size_form.wide_
            item.wide_xu = this.size_form.wide_xu
            item.size_area = this.size_form.size_area
            item.order_num = this.size_form.order_num
            item.size_remark = this.size_form.size_remark
          }
        })
        this.isEdit = false
        // 编辑完成后需要重新计算物料明细中的订单数
        this.rebuild_ma_detail_dingdanshu()

        // 编辑完后重新构建明细列表

        // 编辑完成后重新计算汇总明细的值
        this.create_huizong_list()
      } else {
        this.size_detail_list.push({
          or_num: this.or_num, // 尺寸明细所属的订单
          ma_detail_id: this.current_ma_detail_selected.ma_detail_id,
          // ban_num: this.size_form.ban_num,
          ban_num: this.page_ban_num,
          long_: this.size_form.long_,
          wide_: this.size_form.wide_,
          long_xu: this.size_form.long_xu,
          wide_xu: this.size_form.wide_xu,
          size_area: this.size_form.size_area,
          order_num: this.size_form.order_num,
          size_remark: this.size_form.size_remark
        })
        // this.size_form.ban_num ++
        this.page_ban_num++
        // 根据新添加的size_detail_list的信息，来计算物料明细中的订单数
        this.rebuild_ma_detail_dingdanshu()
      }
    },
    rebuild_ma_detail_dingdanshu () {
      // 这个方法是在添加完明细后来循环计算出当前所选择的物料明细的订单数（面积总和）
      let totalDingdanshu = 0
      this.size_detail_list.forEach((item, index, arr) => {
        if (item.ma_detail_id === this.current_ma_detail_selected.ma_detail_id) {
          totalDingdanshu = totalDingdanshu + item.size_area
        }
      })
      this.ma_detail_list.forEach((item, index, arr) => {
        if (item.ma_detail_id === this.current_ma_detail_selected.ma_detail_id) {
          item.ma_dingdanshu = totalDingdanshu
        }
      })
    },
    setMaterialDetailCurrent (val) {
      console.log(99)
      console.log(val)
    },
    material_detail_add () {
      this.addMaterialDetailFormVisible = false
      if (this.isEdit) {
        // 将修改过的数据修改到数组ma_detail_list中
        this.ma_detail_list.forEach((item, index, arr) => {
          if (this.current_ma_detail_selected.ma_detail_id === item.ma_detail_id) {
            item.or_num = this.or_num
            item.or_name = this.material_form.ma_name
            item.ma_long = this.material_form.ma_long
            item.ma_wide = this.material_form.ma_wide
            item.ma_high = this.material_form.ma_high
            item.ma_dingdanshu = this.ma_detail.ma_dingdanshu
            item.unit_price = this.ma_detail.unit_price
            item.ma_unit = this.material_form.ma_unit
            item.ma_invented = this.material_form.ma_invented
            item.detail_remark = this.ma_detail.detail_remark
          }
        })
        this.isEdit = false
      } else {
        // 将用户填写的物料详情信息保存到ma_detail_list 数组中，然后物料明细列表就会用用户添加的数据
        this.ma_detail_list.push({
          ma_detail_id: new Date().getTime(),
          or_num: this.or_num,
          ma_num: this.material_form.ma_num,
          ma_name: this.material_form.ma_name,
          ma_long: this.material_form.ma_long,
          ma_wide: this.material_form.ma_wide,
          ma_high: this.material_form.ma_high,
          ma_dingdanshu: this.ma_detail.ma_dingdanshu, // 订单数量
          unit_price: this.ma_detail.unit_price, // 切板单价
          ma_unit: this.material_form.ma_unit, // 单位
          ma_invented: this.material_form.ma_invented, // 是否虚拟物品
          detail_remark: this.ma_detail.detail_remark // 物料详情的备注
        })
      }
    },
    handleMaterialDetailSelect () {
      // 处理用户选择的数据，，选择后开始根据ma_num查询详情material
      this.axios.get(this.GLOBAL.BASE_URL + '/material/selectMaterialByMaNum?ma_num=' + this.material_form.ma_num)
        .then(res => {
          if (res.data.code === 20000) {
            console.log(res.data)
            let re = res.data.data
            this.material_form.ma_name = re.ma_name

            this.material_form.ma_long = re.ma_long
            this.material_form.ma_wide = re.ma_wide
            this.material_form.ma_high = re.ma_high

            this.material_form.ma_area = re.ma_area
            this.material_form.ma_volume = re.ma_volume
            this.material_form.ma_unit = re.ma_unit
            this.material_form.ma_invented = re.ma_invented
          } else {
            this.$message.error('物料信息查询失败')
          }
        })
        .catch(() => {
          this.$message.error('加载物料信息失败')
        })
    },
    queryMateriaNums (queryString, cb) {
      // this.material_detail_num_selected = []
      // 查询所有的物料信息，根据编号查询
      this.axios.get(this.GLOBAL.BASE_URL + '/material/findMaterialsByMaNum?ma_num=' + queryString)
        .then(res => {
          console.log(res.data)
          this.material_detail_num_selected = []
          this.material_detail_num_selected = res.data.data
        })
        .catch(() => {
          this.$message.error('加载物料编号失败')
        })
      cb(this.material_detail_num_selected)
    },
    handleCurrentChangeMaterialDetail (currentRow) {
      this.current_ma_detail_selected = currentRow
    },
    createOrder_num () {
      let date = new Date()
      // this.or_num = 'dd' + date.getUTCFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      let year = date.getUTCFullYear()
      let month = (date.getMonth() + 1).toString()
      if (month.length === 1) {
        month = '0' + month
      }
      let day = date.getDate().toString()
      if (day.length === 1) {
        day = '0' + day
      }
      this.axios.get(this.GLOBAL.BASE_URL + '/number/findOrder')
        .then(res => {
          if (res.data.code === 20000) {
            let dayReceive = res.data.data.day
            let num1Rceive = res.data.data.num // 数量可能为0
            let num2 = res.data.data.num
            if (num1Rceive.length === 1) {
              num1Rceive = '0' + num1Rceive
            }
            if ((year + month + day) !== dayReceive) {
              this.or_num = 'dd' + year + month + day + '01'
              // 然后将新的今天的状态保存 到数据库中
              this.create_later_update_Ordernum((year + month + day), 1)
            } else {
              // today===day,表明这死同一天来创建订单，直接拼接就行
              let tdnum = (num2 + 1).toString()
              if (tdnum.length === 1) {
                tdnum = '0' + tdnum
              }
              this.or_num = 'dd' + year + month + day + tdnum
              // 然后去数据中更新今天的状态
              this.create_later_update_Ordernum((year + month + day), num2 + 1)
            }
          }
        })
    },
    create_later_update_Ordernum (day, num) {
      this.axios.get(this.GLOBAL.BASE_URL + '/number/updateOrder?day=' + day + '&num=' + num)
        .then(res => {
          if (res.data.code !== 20000) {
            this.$message.error('自定生成订单号程序出错')
          }
        })
    },
    editMaterialDetail () {
      // 标志位置为编辑状态
      this.isEdit = true
      // 编辑物料明细 ，首先显示输入窗口，然后把源数据填进去，但不能动ma_detail_id

      if (!this.isEmptyObject(this.current_ma_detail_selected)) { // 保证用户已经选择了某一行数据
        this.addMaterialDetailFormVisible = true

        // 先修改material_form中的数据值(来自current_ma_detail_selected)，当点击确定按钮的时候再将数保存进ma_detail_list中，
        // 注意需要将ma_detail_id这个时间戳替换为选择的，，默认是自动生成全新的
        this.material_form.ma_num = this.current_ma_detail_selected.ma_num
        this.material_form.ma_name = this.current_ma_detail_selected.ma_name
        this.material_form.ma_area = this.current_ma_detail_selected.ma_long * this.current_ma_detail_selected.ma_wide
        this.material_form.ma_volume = this.material_form.ma_area * this.current_ma_detail_selected.ma_high
        this.ma_detail.unit_price = this.current_ma_detail_selected.unit_price
        this.material_form.ma_unit = this.current_ma_detail_selected.ma_unit
        this.ma_detail.detail_remark = this.current_ma_detail_selected.detail_remark
      } else {
        this.$message({
          message: '请选择一条物料明细',
          type: 'warning'
        })
      }
    },
    deleteMaDetail () {
      // 删除用户所选择的物料明细
      if (!this.isEmptyObject(this.current_ma_detail_selected)) {
        this.ma_detail_list.forEach((item, index, arr) => {
          if (this.current_ma_detail_selected.ma_detail_id === item.ma_detail_id) {
            this.ma_detail_list.splice(index, 1)
          }
        })
      } else {
        this.$message({
          message: '请点击某一行物料明细选择物料',
          type: 'warning'
        })
      }
    },
    isEmptyObject (obj) {
      for (var key in obj) {
        return false
      };
      return true
    },
    addMateialFormVisibleFun () {
      this.addMaterialDetailFormVisible = false
      this.isEdit = false
    },
    saveAllData () {
      // 点击一下不可再点击
      this.saveloading = true

      // 将所有的数据发送到后端保存起来
      // ma_detail_list  size_detail_list  working_detail_list，和基本订单信息

      // 拼接material_name_str
      this.ma_detail_list.forEach((item, index, arr) => {
        this.material_name_str = this.material_name_str + item.ma_name + ','
      })
      this.material_name_str = this.material_name_str.substring(0, this.material_name_str.length - 1)
      var orderInfo = {
        or_num: this.or_num,
        custom: this.custom,
        project_num: this.project_num,
        telephone: this.telephone,
        place_order_date: this.place_order_date,
        hand_order_date: this.hand_order_date,
        saleman: this.saleman,
        handler: this.handler,
        receiver: this.receiver,
        destination: this.destination,
        od_remark: this.od_remark,
        material_name_str: this.material_name_str
      }

      this.axios.post(this.GLOBAL.BASE_URL + '/order/saveOrder', {
        orderInfo: orderInfo,
        ma_detail_list: this.ma_detail_list,
        size_detail_list: this.size_detail_list,
        working_detail_list: this.working_detail_list
      }).then(res => {
        if (res.data.code === 20000) {
          this.$message({
            message: '订单创建成功',
            type: 'success'
          })
          // 在订单跳转之前先将session中的数据清空
          sessionStorage.clear()
          this.$emit('changeMain', ['OrderList'])
        } else {
          this.$notify({
            title: '警告',
            message: '订单创建失败 ！！！',
            type: 'warning'
          })
        }
      })
    },
    rebackToOrderList () {
      this.$emit('changeMain', ['OrderList'])
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
