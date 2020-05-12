class Tableaction{
        del(){
            return new Promise((reslove,reject)=>{
                    setTimeout(()=>{
                            reslove('table列表删除方法')
                    })
            })
        }
}
export default Tableaction