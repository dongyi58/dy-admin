import Mock from 'mockjs'
export default Mock.mock('/mockdata', {

          'name'    : '@name',

          'age|1-100': 100,

          'color'    : '@color'

});