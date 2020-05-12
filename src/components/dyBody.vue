<template>
    <div class="dy-body">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'dyBody'
}
</script>
<style>
    .dy-body{
        display: flex;
        flex-direction: column;
        flex:1;
        height:0;
    }
</style>