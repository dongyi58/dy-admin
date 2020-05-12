import Mock from 'mockjs'

Mock.mock('/chartData', {
    "sales|10": ['@integer(10, 100)'],
    "refunds|10":['@integer(10, 70)'],
    "date|10":['@date("y-M")']
});

const position = ['经理','销售组长','前端']
const department = ['行政管理','销售部','开发部']
Mock.mock('/tabledata', {
    
        
            'total':20,
            'page':1,
            'data|20':[
                {
                    "name": '@cname',
                    "id|+1": 1,
                    "address":'@county(true)',
                    "phone":/^1[385][1-9]\d{8}/,
                    "date":'@date',
                    "status":'@boolean',
                    "pos":'销售人员',
                    "dep":'销售部'
                }
            ]
        
      
});

