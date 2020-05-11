<template>
  <div class="home">
        <el-row >
          <el-col :span="16" class="home_left">
              <el-row class="home_left_one" :gutter="30">
                  <el-col :span="8" v-for="(item,idx) of totalList" :key="idx">
                      <div class="home_left_one_item">
                          <div class="item_icon">
                              <i :class="item.icon"  :style={color:item.color}></i>
                          </div>
                           <div class="item_descption">
                             <span class="item_descption_title">{{item.title}}</span>
                             <span class="item_descption_count" :style={color:item.color}>{{item.count}}</span>
                           </div>
                      </div>
                  </el-col>
              </el-row>
          </el-col>
          <el-col :span="8" class="home_right">222</el-col>
        </el-row>
       <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
  </div>
</template>

<script>

export default {
  name:'home', 
   data () {
    return {
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
    // this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .home_left{
       &_one{
          &_item{
             display:flex;
             justify-content: center;
             align-items: center;
             background:$white;
             border-radius:3px;
             padding:1rem;
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
    }
</style>
