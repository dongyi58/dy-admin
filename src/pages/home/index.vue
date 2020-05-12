<template>
  <dy-container>
     <dy-body class="home_body">
            <div class="home_left">
                        <div class="home_left_one" style="height:84px">
                              <div  class="home_left_one_item" v-for="(item,idx) of totalList" :key="idx">
                                  <div class="home_left_one_item_bkg" >
                                      <div class="item_icon">
                                          <i :class="item.icon"  :style={color:item.color}></i>
                                      </div>
                                      <div class="item_descption">
                                        <span class="item_descption_title">{{item.title}}</span>
                                        <span class="item_descption_count" :style={color:item.color}>{{item.count}}</span>
                                      </div>
                                  </div>
                              </div>
                              
                          </div>
                          <div  class="chart_box" style="height:calc(66% - 84px);"> 
                                <div style="background:#fff;height:100%">
                                  <el-tabs v-model="activeName" @tab-click="updateData">
                                        <el-tab-pane label="本月" name="first"></el-tab-pane>
                                        <el-tab-pane label="近半年" name="second"></el-tab-pane>
                                          <el-tab-pane label="近一年" name="third"></el-tab-pane>
                                    </el-tabs>
                                  <div id="saleChart" style="height:calc(100% - 54px)"></div>
                                </div>
                          </div>
                          <div class="chart_box bottom_chart_box" style="height:34%;">
                              <div id="activeChart">11</div>
                              <div id="businessChart">22</div>
                          </div>
                  </div>
                  <div  class="home_right">
                     
                       <div class="home_right_list">
                           <div class="r_title">用户列表</div>
                            <div class="right_scroll_view">
                              <div class="home_right_list_item" v-for="(item,idx) in 20" :key="idx">
                                <img src="../../assets/1.jpg" alt="" width="50" style="flex-shirk:0">
                                <div class="r_content">
                                  <span>Nursas</span>
                                  <span>asdasdasdasd</span>
                                </div>
                              </div>
                            </div>
                       </div>
                  </div>
      </dy-body>

  </dy-container>
</template>

<script>
import Chart from '@/common/chart'

import '../../util/mock'
export default {
  name:'home', 
   data () {
    return {
      activeName:'first',
       totalList:[
         {
           icon:'el-icon-s-finance',
           title:'总订单额',
           count:'¥5858.39',
           color:'#6a69ab'
         },
         {
           icon:'el-icon-s-claim',
           title:'已成交',
           count:'¥2858.39',
           color:'#0eb1b5'
         },
         {
           icon:'el-icon-s-release',
           title:'已取消',
           count:'¥3158.39',
           color:'#6a69ab'
         }
       ]
    }
  },
  mounted(){
    
   this.chartinit()
    
  },
  methods: {
      updateData(e){
        let idx = e.index //0,本月 1，近半年，2，近一年
          this.chartinit()
      },
      //初始化图表
      chartinit(){
            this.$http('/chartData').then(data=>{
                 let chart = new Chart(this)
                 chart.drawSalesChart('saleChart',data)
                 chart.drawPie('activeChart')
                 chart.drawBar('businessChart')
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .home_body{
      display: flex;
    flex-direction: row;
      padding:30px;
      height:100%;
    }
    .home_left{
      width:70%;
      height:100%;
       &_one{
         display: flex;
          justify-content: space-between;
          &_item{
             display:flex;
            
             width:calc(33% - 15px);
             &_bkg{
               display:flex;
                justify-content: center;
                align-items: center;
                border-radius:3px;
                width:100%;
               background:#fff;
             }
             .item_icon i{
               font-size:$size_25;
               margin-right:1rem;
             }
             .item_descption{
               display: flex;
               flex-direction: column;
               &_title{
                 font-weight:500
               }
               &_count{
                 font-size:$size_16;
                 margin-top:.5rem;
               }
             }
             
          }
       }
       .chart_box{
         border-radius:3px;
         padding-top:30px;
         .el-tabs__nav-wrap:after{
            background-color: #fff;
          }
          .el-tabs__item.is-active{
            color:#000;
          }
          .el-tabs__item{
            color:#999;
          }
          .el-tabs__active-bar{
           
            background-color:#836cbe
          }
       }
       .bottom_chart_box{
         display: flex;
         div{
           background:#fff;
         }
          #activeChart{
            width:40%;
            flex-shrink: 0;
            padding-right:30px;
          }
          #businessChart{
            flex:1;
          }
       }
    }
     .home_right{
       width:30%;
       padding-left:30px;
       .home_right_list{
          height:100%;
          overflow-y: scroll;
          background:#fff;
          padding:1rem 2rem;
          border-radius:3px;
          .right_scroll_view{
            height: calc(100% - 60px);
            overflow-x: hidden;
          }
           .r_title{
              font-size:14px;
              font-weight: 600;
              padding:2rem 0;
            }
          &_item{
            display: flex;
            padding:1rem 0;
            border-bottom:1px solid #eee;
            img{
              width:30px;
              height:30px;
              flex-shrink: 0;
              border-radius:50%;
              object-fit: cover;
            }
           
            .r_content{
              display: flex;
              flex-direction: column;
              padding:0 2rem;
              span:first-child{
                font-weight:600
              }
              span:last-child{
                color:#999
              }
            }
          }
       }
     }
</style>
<style scoped>
  .el-tabs{
    padding:0 5%;
  }
 
</style>
