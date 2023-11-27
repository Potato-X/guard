<template>
    <input v-model="inuptvalue">
</template>

<script setup lang='ts'>
import { computed } from 'vue'
const props = defineProps({
    text:{
        type:String,
        default:""
    }
})
const emit = defineEmits<{
    (e:"update:text",data:string):void
}>()
const inuptvalue = computed({
    get(){
        return props.text
    },
    set(newvalue){
        console.log(newvalue)
        emit("update:text",newvalue)
    }
})
</script>

<style lang='scss' scoped></style>