<template>
        <div class="sideMenu" >
          
            <el-menu
                :default-active="$route.path"
                class="mainMenu"
                text-color="#7b7b7b"
                background-color="#262a2d"
                active-text-color="#fff"
                :default-openeds="['1']"
                @select="handleSelect"
                :collapse="collapse"
                router
                >
                <!-- 开启router后 el-menu-item 的 index 作为 path 进行路由跳转 -->
                <el-menu-item index="/home"> 
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </el-menu-item>

                <el-menu-item index="/table">
                    <i class="el-icon-s-order"></i>
                    <span>表格</span>
                </el-menu-item>
                <!-- 多级菜单的index为唯一标识，用来控制默认展开 -->
                <el-submenu index="1" class="submenu">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item index="/userSetting">
                        <i class="el-icon-user-solid"></i>
                        <span>用户设置</span>
                    </el-menu-item>
                    <el-menu-item index="/permassion">
                        <i class="el-icon-success"></i>
                        <span>权限设置</span>
                    </el-menu-item>
                 </el-submenu>
               
            </el-menu>
            </div>
</template>
<script>
export default {
    name:'sideMenu',
    data(){
        return{
            show:true,
            navtabs:[],//存储生成的tabs
            tabsPath:[],//存储点击后的路径，防止重复点击
            
            current:-1,
            navName:{
                'monitor':'实时监测',
                'business':'业务管理',
                'device':'设备管理',
                'vehicle':'车辆管理',
                'driver':'司机管理'
            },
            
        }
    },
    computed:{
        collapse(){
            return this.$store.state.collapse
        }
    },
   
     methods: {
    menuCtrl(e){
      this.show=e
    },
    // showmenu(){
    //   // console.log(this.show)
    //   this.show = !this.show
    // },

    //点击左侧菜单生成标签页
    handleSelect(path){
          //取消激活已生成的标签页
          if(this.navtabs.length > 0){
                  this.navtabs.map(item=>{
                      this.$set(item,'active',false)
                  })
            }
         
          //防止重复点击 this.tabsPath存储点击过的菜单链接
          //非重复，添加新标签页时
          if(this.tabsPath.indexOf(path) < 0){
            this.tabsPath.push(path)
              //添加新生成的标签页
              this.navtabs.push({
                path:path,
                name:this.navName[path],
                active:true //取消激活已生成的标签页后，激活新生成的标签页
              })
          }else{
              //重复点击时，激活对应标签页
              this.navtabs.map(item=>{
                if(item.path == path){
                    this.$set(item,'active',true)
                }else{
                  this.$set(item,'active',false)
                }
              })
          }
      
    },
    //点击重新激活标签页，跳转到页面
    activeTabs(idx,path){
        this.navtabs.map((item,tidx)=>{
          if(tidx == idx){
            this.$set(item,'active',true)
          }else{
            this.$set(item,'active',false)
          }
            
        })
       this.$router.push({name:path})
    },
    //关闭标签页
    closeTabs(closeIdx){
        //当前标签页总长度
       let len = this.navtabs.length-1;
       //如果关闭的是最后一个标签页，跳转到首页
       if(len == 0 ){
          this.$router.push({name:'monitor'})
       }else{
         //如果当前关闭的标签页是激活的状态且是标签页的最后一个
         //关闭后重定向到上一个标签页
         //反之重定向到下一个标掐页
          if(this.navtabs[closeIdx].active){
              if(closeIdx == len){
                 this.closedRedirect(closeIdx-1)//重定向
              }else{
                this.closedRedirect(closeIdx+1)
              }
          }
       }
       //删除存储的对应标签页和地址，关闭标签页
        this.navtabs.splice(closeIdx,1)
        this.tabsPath.splice(closeIdx,1)
     },
     //关闭标签页后重定向方法
     closedRedirect(redirectIdx){

       this.navtabs.map((item,nidx)=>{
              if(nidx == redirectIdx){
                  this.$set(item,'active',true)
              }else{
                  this.$set(item,'active',false)
              }
        })
       
        this.$router.push({name:this.navtabs[redirectIdx].path})
     }
  }
}
</script>
<style lang="scss">
    .mainMenu{
      height:100vh;
      border:0;
      z-index:99;
    }
    .mainMenu:not(.el-menu--collapse) {
     width: 250px;
    }
    .submenu{
        .el-menu-item{
            background-color:#1a1e21 !important;
            
        }
    }

    .collapse_box{
        display: flex;
        justify-content: center;
        padding:1rem 0;
        .el-button{
            background:#33373b;
            border:none;
        }
        .el-button:hover{
            color:#fff
        }
    }
</style>
<style scoped>
  .el-menu-item i,.el-submenu__title i{
     position: relative;
        top: -2px;
  }
</style>