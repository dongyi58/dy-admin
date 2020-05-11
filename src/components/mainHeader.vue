<template>
    <el-header class="main_header">
          <el-col :span="6" class="header_left">

             <i class=" collapse_ctrl" :class="collapseicon"  @click="handleCollapse"></i>
             <span>{{title}}</span>

            </el-col>
            <el-col :span="5" class="header_right">
              
              <el-dropdown trigger="click" class="header_dropdown">
                 <el-avatar shape="square" size="medium"  fit="scale-down" :src="require('../assets/1.jpg')"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人资料</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
      </el-header>
</template>
<script>
  export default {
      props:{
        title:{
          default:'DY-ADMIN',
          type:String
        }
      },
      name:'mainHeader',
      data(){
            return{
               show:null,
               collapseicon:'el-icon-s-fold',
            }

      },
      computed:{
        collapse(){
          return this.$store.state.collapse
        }
      },
       watch:{
        collapse(show){
            show ? this.collapseicon = 'el-icon-s-unfold': this.collapseicon ='el-icon-s-fold'
        }
    },
      mounted(){
      
      },
      methods:{
        handleCollapse(){
          this.$store.commit('SET_MENU_COLLAPSE')
        }
      }
  }
</script>
<style lang="scss">
  .main_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:$white;
    box-shadow:0 1px 4px rgba(0,21,41,.08);
      .header_left{
        display: flex;
        align-items: center;
        font-size:$size_14;
        .collapse_ctrl{
          font-size:$size_18;
          margin-right:1rem;
          cursor: pointer;
        }
      }
      .header_dropdown{
          cursor:pointer;
          
      }
   
      .header_right{
          display: flex;
          justify-content: flex-end;
      }
  }
  .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: $gray-white;
      color: $global_color;
  }
</style>