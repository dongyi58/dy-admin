<template>
       <div class="pagination_box_action">
            <el-checkbox 
            @change="paginationCheckAll"
            label="全选" v-model="checkAll" size="mini" border class="pagination_box_action_one"></el-checkbox>
            <el-select v-model="actionAllVal"
            @change="handleSelectChange"
            placeholder="批量操作" size="mini" style="width:100px">
            <el-option  
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            <!-- 批量修改部门和职位选项弹窗 -->
            <el-dialog
                :title="title"
                :visible.sync="setVisible"
                @close="closeSet"
                width="30%">
                <el-form label-position="left" label-width="80px" :model="resetStaffForm" :rules="restStaffFormRules" ref="resetStaffForm">
               
                        <el-form-item  label="所属部门" prop="staffDepartment" v-if="title=='修改部门'">
                            <el-select  size="mini"  style="width:100%" clearable placeholder="请选择所属部门"  v-model="resetStaffForm.staffDepartment">
                                <el-option
                                        v-for="item in staffDepartmentOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="当前职务" prop="staffPos" v-else>
                            <el-select size="mini" style="width:100%" clearable placeholder="请选择员工职务"  v-model="resetStaffForm.staffPos">
                                <el-option
                                        v-for="item in staffPosOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
            </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setVisible = false">取 消</el-button>
                    <el-button type="primary" @click="resetSubmit">确 定</el-button>
                </span>
            </el-dialog>
       </div>
</template>
<script>


export default {
    props:{
        tableRef:Object, //传递父组件的table实例，用来控制全选
        totalLen:Number, //列表个数
        SelectedRowNums:{
            default:0,
            type:Number
        },//选中的列表个数
        options:Array
    },
    watch:{
        //根据选中的个数设置全选按钮状态
        SelectedRowNums(selectNum){
            console.log(selectNum,this.totalLen)
             selectNum == this.totalLen ?  this.checkAll = true :  this.checkAll = false
        }   
    },
    data(){
        return{
            checkAll:false,
            actionAllVal:'',
            title:'',
            setVisible:false,
            type:'',//修改种类，部门或职务
            resetStaffForm:{
                staffDepartment:'',
                staffPos:''
            },
            restStaffFormRules: {
                staffDepartment: [
                    { required: true, message: '请选择所属部门', trigger: 'change' }
                ],
                staffPos: [
                    { required:true, message: '请选择员工职务', trigger: 'change' }
                ],
            },
            actionMethod:'',//存储要调用的方法
             //员工职务选项
            staffPosOptions: [{
                value: 1,
                label: '产品经理'
            }, {
                value: 2,
                label: '运营'
            }, {
                value: 3,
                label: '视频编辑'
            }, {
                value: 4,
                label: '法务管理'
            }, {
                value: 5,
                label: '开发人员'
            }],
            //员工部门选项
            staffDepartmentOptions: [{
                value: 1,
                label: '行政管理'
            }, {
                value: 2,
                label: '开发团队'
            }, {
                value: 3,
                label: '政务管理'
            }],
        }
    },
    methods:{

         

            //批量操作下拉框选中后
            handleSelectChange(e){
                if(this.SelectedRowNums == 0){
                    this.$message({
                        type: 'error',
                        message: '请选择需要操作的数据',
                        
                    });
                    return
                }
                this.$emit('action',e)
            },

           
           //提交修改
            resetSubmit(){
                    this.$refs.resetStaffForm.validate(valid=>{
                        if(!valid) return;
                        
                          this.actionMethod()
                          this.setVisible=false
                    })
            },

            //关闭重设弹窗
            closeSet(){
                 this.clearSelection()
            },
            //全选反选table
            paginationCheckAll(){
                this.tableRef.toggleAllSelection()
            },

            //清空table的选择状态 || 同时恢复分页区全选按钮初始状态
            clearSelection(){
                // this.$emit('clearRowNums')
                this.checkAll = false
            },
    }
}
</script>   
<style lang="scss">
    .pagination_box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_action_one{
      margin-right:10px !important;
    }
  }
  .actionBtn{
    color:#0079FE;
    padding:0 5px;
    cursor: pointer;
  }
  .actionBtn:hover{
    text-decoration: underline;
  }
  /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
     background-color:#bdd7ff;
     color:#fff;
  }
</style>