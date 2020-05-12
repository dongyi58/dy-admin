<template>
    <dy-container>
        <dy-header style="padding:1rem">
               <el-form :inline="true" :model="searchForm" class="sform">
                  <el-form-item label="姓名">
                    <el-input v-model="searchForm.name" placeholder="输入姓名查找" size="mini"  @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-select v-model="searchForm.status" placeholder="选择状态" size="mini">
                      <el-option label="已启用" value="shanghai"></el-option>
                      <el-option label="已禁用" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="search">查询</el-button>
                  </el-form-item>
              </el-form>

        </dy-header>
        <dy-body>
            <el-table
              ref="tableRef"
              :data="filerData"
              tooltip-effect="dark"
              height="100%"
              @selection-change="handleChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="姓名">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号码">
                 <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>
              <el-table-column
                prop="pos"
                label="职位">
                 <template slot-scope="scope">{{ scope.row.pos }}</template>
              </el-table-column>
              <el-table-column
                prop="dep"
                label="所属部门">
                 <template slot-scope="scope">{{ scope.row.dep }}</template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="180"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.address }}</template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="创建时间"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
               <el-table-column
                prop="address"
                label="状态"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status" @change="handleSwitch($event,scope.row)">
                    </el-switch>
                </template>
              </el-table-column>
                <el-table-column
                prop="address"
                label="操作"
                 width="120"
                show-overflow-tooltip>
                 <template>
                    <span class="edit" style="color:#2196F3;cursor:pointer" @click="editAction">编辑</span>
                 </template>
              </el-table-column>
            </el-table>
        </dy-body>
        <div class="bottom">
          <dyBottomAction 
                :tableRef="$refs.tableRef"
                :totalLen="tableData.length"
                :SelectedRowNums="baction.SelectedRowNums"
                :options="baction.options"
                @action="handleAction"
                >
                 </dyBottomAction>
                  <pagination 
                  :total="pager.total" 
                  :currentPage="pager.curpage" />
        </div>
          <el-dialog
                title="编辑"
                :visible.sync="editVisible"
                width="460px">
                <el-form @submit.native.prevent label-position="left" label-width="80px" :model="editForm" :rules="editFormRules" ref="editForm">
                         <el-form-item  label="姓名" prop="name">
                            <el-input v-model="editForm.name" placeholder="请输入员工姓名" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item  label="所属部门" prop="dep">
                            <el-select  size="mini"  style="width:100%" clearable placeholder="请选择所属部门"  v-model="editForm.dep">
                                <el-option
                                        v-for="item in editFormOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
            </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
                </span>
            </el-dialog>
    </dy-container>
</template>
<script>
import '../../util/mock'
//table批量操作api
import Tableaction from '@/api/tableAction'

import pagination from '@/components/pagination'

import dyBottomAction from '@/components/dyBottomAction'

export default {
  components:{pagination,dyBottomAction},
     data() {
      return {
         input1: '',
         input2: '',
         editVisible:false,
         loading:false,
         editForm:{
           name:'',
           dep:''
         },
         editFormOptions:[
           {
             label:'销售部',
             value:0
           },
           {
             label:'开发部',
             value:1
           }
         ],
          editFormRules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                dep: [
                    { required:true, message: '请选择员工所属部门', trigger: 'change' }
                ],
            },
         baction:{ //批量操作必传
            SelectedRowNums:0,
            totalLen:0,
            
            options:[
                {
                  value:0,
                  label:'全部删除'
                },
                {
                  value:1,
                  label:'全部禁用'
                },
                {
                  value:2,
                  label:'全部启用'
                }
            ]
         },
         pager:{
            total:0,
            curpage:0,
         },
         tableData:[],
         searchKey:'',
         multipleSelection: [],
         searchForm:{
           name:'',
           status:''
         },
        
      }
    },
    watch:{
      searchForm:{
          handler(form){
              this.searchKey = form.name
          },
          deep:true
      }
    },
    computed:{
      //简单模糊查询
        filerData(){
          if(this.searchKey != ''){
            return this.tableData.filter(item=>{
                    return item.name.includes(this.searchKey)
              })
          }else{
            return this.tableData
          }
              
        }
    },
    mounted(){
      this.getData()
    },
    methods:{
      search(){
        this.searchKey = this.searchForm.name
      },
      //获取列表数据
        getData(){
          this.$http('/tabledata').then(res=>{
            console.log(res)
              this.pager.total = res.total
              this.pager.curpage = res.page
              this.tableData.push(...res.data)
          })
        },
        //切换状态
        handleSwitch(e,item){
            let tips;
              if(e){
                  tips = `开启了${item.name}的帐号`
              }else{
                tips = `禁用了${item.name}的帐号`
              }
               this.$message({
                message: tips,
                type: 'info'
              });
        },
        handleChange(e){
            this.baction.SelectedRowNums = e.length  
        },
        //批量操作方法
        handleAction(type){
              switch(type){
                  case 0: this.del();
                  break;
                  case 1 : this.enableAll(1);
                  break;
                  case 2 : this.enableAll(2)
              }
        },
        del(){
            setTimeout(()=>{
              this.$message({
                  type: 'success',
                  dangerouslyUseHTMLString: true,
                  message: `成功删除<span style="color:red;padding:0 5px;">${this.baction.SelectedRowNums}</span>条数据`
              });
            },1000)
        },
        enableAll(type){
              if(type == 1){
                  setTimeout(()=>{
                    this.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: `已全部禁用`
                    });
                  },1000)
              }else{
                setTimeout(()=>{
                    this.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: `已全部启用`
                    });
                  },1000)
              }
        },
      editAction(){
          this.editVisible = true
      },
      //提交表单  
       submit() {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
             this.loading=true
              setTimeout(()=>{
                    this.editVisible=false
                     this.loading = false
                     this.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: `操作成功`
                    });
              },1500)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
   
}
</script>
<style lang="scss">
.sform{
  .el-form-item{
    margin-bottom:0;
  }
}

.bottom{
   display: flex;
        justify-content: space-between;
        padding:1rem;
}
</style>