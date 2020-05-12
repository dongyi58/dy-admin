<template>
    <div class="dy-container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
    },
    mounted(){
        console.log(this.aa)
    }
}
</script>
<style>
    .dy-container{
        display: flex;
        flex-direction: column;
        width:100%;
        height: calc(100vh - 90px);
    }
</style>