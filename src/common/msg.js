import { Message } from 'element-ui'
const msg = {
    success(nums){
        Message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `成功修改<span style="color:red;padding:0 5px;">${nums}</span>条数据`
        });
    },
     err(nums){
        Message({
            type: 'error',
            dangerouslyUseHTMLString: true,
            message: `修改失败`
        });
    }
}
export default msg
