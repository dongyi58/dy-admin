

class Chart{
    constructor(self){
        this.self = self
        this.colorArr = ['#0cb2b8','#836cbe','#808bc6']
        
    }     
    
    //首页销售曲线表
    drawSalesChart(el,data){
        console.log(document.getElementById(el))
        // 基于准备好的dom，初始化echarts实例
        let salesChart = this.self.$echarts.init(document.getElementById(el))
        //销售量数据
        let salesData = data.sales
        //退货数据
        let refundsData = data.refunds
        //时间轴
        let dateData = data.date
        let mixdata = [...salesData,...refundsData]
        
        let max= Math.ceil(Math.max(...mixdata))
        let min = Math.floor(Math.min(...mixdata))

        let intervalnum = Math.floor(max / 4)
        let options = {
            color:this.colorArr, 
            legend:{
                left:'5%',
                top:'5%',
                icon:'circle'
            },
            grid:{
            
                width:'83%',
                height:'60%',
                top:'20%'
                
            },
            tooltip: {
                trigger: 'axis',
               
            },
            xAxis: {
                type:'category',
                data: dateData,
                axisTick:{show:false},
                splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#eee'],
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color: ['#eee'],
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel:{
                    color:'#383838'
                }
            },
            yAxis: {
            type: 'value',
            boundaryGap: true,
            axisTick:{show:false},
            axisLine:{
                lineStyle:{
                    color: ['#eee'],
                    width: 1,
                    type: 'solid'
                },
                
            },
            splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#eee'],
                        width: 1,
                        type: 'solid'
                    },
                    
                },
                axisLabel:{
                    color:'#383838'
                },
                min:'dataMin',
                minInterval:min,
                maxInterval:max,
                interval:intervalnum
            },
            series: [{
                name: '销量',
                type: 'line',
                smooth:true,
                data: salesData,
                lineStyle:{
                    color:'#0cb2b8',
                    width:3,
                    shadowBlur: 10,
                    shadowOffsetY:15,
                    shadowColor:'#0cb2b8'
                }
            },{
                name: '退货',
                type: 'line',
                smooth:true,
                data: refundsData,
                lineStyle:{
                    color:'#836cbe',
                    width:3,
                    shadowBlur: 10,
                    shadowOffsetY:15,
                    shadowColor:'#836cbe'
                }
            }]
        }
        // 绘制图表
        salesChart.setOption(options);
        window.onresize = () => {
            salesChart.resize()
        }
    }
    drawPie(el){
       let pie = this.self.$echarts.init(document.getElementById(el));
        let option = {
            tooltip: {//提示框，可以在全局也可以在
                trigger: 'item',  //提示框的样式
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                color:'#fff', //提示框的背景色
                textStyle:{ //提示的字体样式
                    color:"#fff",
                }
            },
            legend: {  //图例
               
                bottom:0,
                data:['A','B'],
                textStyle:{    //图例文字的样式
                    color:'#333',  //文字颜色
                    fontSize:12    //文字大小
                },
                icon:'circle'
            },
            graphic: [{//环形图中间添加文字
                type: 'text',//通过不同top值可以设置上下显示
                left: 'center',
                top: '45%',
                style: {
                    text: "553",
                    textAlign: 'center',
                    fill: '#383838',//文字的颜色
                    width: 30,
                    height: 30,
                    fontSize: 15,
                    fontWeight:600,
                    color: "#4d4f5c",
                    fontFamily: "Microsoft YaHei"
                }
            },{
                type: 'text',
                left: 'center',
                top: '52%',
                style: {
                    text: 'Total',
                    textAlign: 'center',
                    fill: '#ccc',
                    width: 30,
                    height: 30,
                    fontSize: 12,
                }
            }],
            series: [
                {
                    name:'Title',
                    type:'pie', //环形图的type和饼图相同
                    radius: ['50%', '60%'],//饼图的半径，第一个为内半径，第二个为外半径
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    color:this.colorArr,
                    label: {
                        normal: {  //正常的样式
                            show: false,
                            position: 'center',
                            formatter:function(p){
                                console.log(p)
                                return ' Total\r\n 1023.33'
                            },
                            textStyle:{
                                fontSize:14,
                                color:"#666"
                            }
                        },
                        emphasis: { //选中时候的样式
                            show: false,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold',
                                color:'#fff'
                            }
                        }
                    },  
                    data:[
                        {value:335, name:'A'},
                        {value:310, name:'B'},
                    ]
                }
            ]
        };
        pie.setOption(option);
        // window.onresize = () => {
        //     pie.resize()
        // }
    }
    drawBar(el){
       
        let bar = this.self.$echarts.init(document.getElementById(el));
        let option = {
            color:this.colorArr, 
            tooltip: {//提示框，可以在全局也可以在
                trigger: 'axis',  //提示框的样式
               
                textStyle:{ //提示的字体样式
                    color:"#fff",
                }
            },
            legend:{
                icon:'circle',
                left:'5%',
                top:'5%'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick:{show:false},
                axisLine:{
                    lineStyle:{
                        color: ['#eee'],
                        width: 1,
                        type: 'solid'
                    },
                    
                },
                splitLine: {
                        show: false,
                        
                    },
                    axisLabel:{
                        color:'#383838'
                    },
            },
            yAxis: {
                type: 'value',
                show:false,
                axisTick:{show:false},
                axisLine:{
                    show:false
                    
                },
                splitLine: {
                        show: false
                        
                    },
                    axisLabel:{
                        color:'#383838'
                    },
            },
            series: [{
                name: 'A',
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                stack: '总量',
                barWidth:'20%',
                itemStyle:{
                    barBorderRadius: [0,0,5,5]
                }
            },
            {
                name: 'B',
                type: 'bar',
                stack: '总量',  
                barWidth:'20%',
                data: [120, 132, 101, 134, 90, 230, 210],
                itemStyle:{
                    barBorderRadius: [5, 5, 0, 0]
                }
            },]
        };
        bar.setOption(option);
        
    }
}

export default Chart 