<template>
   <div class="main_container">
         
           
              <!-- 侧边栏 -->
              <sideMenu />

              <!-- 右侧内容区域 -->
              <div class="main_right">
                 <!-- 右侧页头 -->
                 <mainHeader  />

                 <tags/>

                <!-- 子路由展示 -->
                 <transition name="fade-transform" mode="out-in">
                  <keep-alive>
                      <router-view :include="tagsList" class="content_view"></router-view>
                    </keep-alive>
                  </transition>
              </div>
        </div>
    
</template>

<script>
import mainHeader from '@/components/mainHeader'
import sideMenu from '@/components/sideMenu'
import breadcrumb from '@/components/breadcrumb'
import tags from '@/components/tags'
import bus from '@/common/bus';

export default {
  components:{
      mainHeader,
      sideMenu,
      breadcrumb,
      tags
  },
   data(){
      return{
          right_width:0,
          tagsList:[]
     }
   },
   created() {
     //添加需要keep-alive的tag
      bus.$on("tags", list => {
        let arr = [];

        for (let i = 0, len = list.length; i < len; i++) {
          list[i].title && arr.push(list[i].title);
        }
        this.tagsList = arr;  
        // console.log(this.tagsList)
      });
     
   },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">


  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-10px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }

 .main_container{
   display:flex;
  .main_right{
    flex:1
  }
 }

 .content_view{
   padding:1rem;
 }
 .main_right{
   background:$main_color
 }
</style>
