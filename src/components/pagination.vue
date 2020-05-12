<template>
        <div class="pager">
                
                <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100, 200]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
        </div>
</template>
<script>

export default {
    props:{
        total:Number,//数据总数s
        currentPage:{
            default:0,
            type:Number
        },
    },

    mounted(){
        console.log(this.options)
        
    }
}
</script>
<style>
   
</style>