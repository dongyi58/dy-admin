<template>
    <div class="dy-header">
        <div class="titlebar">数据查询</div>
           <slot></slot>
    </div>  
</template>
<script>
    export default {
        name:'dyHeader'  
    }
</script>
<style>
    .dy-header{
        padding: 20px 0;
        background:#fff;
         border-bottom:1px solid #eee;
    }
    .titlebar{
        position:relative;
        font-size:16px;
        font-weight: 600;
        padding:1rem;
    }
    .titlebar::before{
        content: '';
        position:absolute;
        top:20%;
        left:0;
        width:2px;
        height:60%;
        background: seagreen;
    }
</style>