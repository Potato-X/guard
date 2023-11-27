<template>
    <div class="message-box" ref="messageBox">
        <div class="message-box__wrapper" >
            <div class="message-box__body" ref="box" draggable>
                <div class="message-box__title">{{ title }}</div>
                <div class="message-box__content">{{ content }}</div>
                <div class="message-box__btns">
                    <el-button type="primary" @click="save">确定</el-button>
                    <el-button plain @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
        <div class="model" ref="model"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { IComponentProps } from './types'
import { ElButton } from 'element-plus'
const props = withDefaults(defineProps<IComponentProps>(), {
    content: "",
    title: "",
    confirmcb: () => { },
    cancelcb: () => { },
    el:undefined
})
const box = ref()
const messageBox =ref()
function close() {
    const el = box.value as Element;
    setTimeout(()=>{
        (messageBox.value as Element).remove();
        (props.el as Element).remove()
    },300);
    el.classList.remove('show-box');
    // el.
}
function save() {
    close()
    props.confirmcb()
}

function cancel() {
    close()
    props.cancelcb()
}
</script>

<style lang='scss' scoped>
.model {
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
}
.message-box{
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    width: 100%;
}
.message-box__wrapper {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1001;

    .message-box__body {
        opacity: 0;
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        width: 420px;

        background-color: #ffffff;
        padding: 32px 32px 24px 32px;
        box-sizing: border-box;
        border-radius: 4px;
        transition: all ease .6s;

        .message-box__title {
            text-align: left;
            font-size: 16px;
            color: #333;
        }

        .message-box__content {
            text-align: left;
            margin: 12px 0;
            padding-left: 40px;
            display: flex;
            flex-wrap: wrap;
        }

        .message-box__btns {
            margin-top: 24px;
            padding-top: 5px;
            box-sizing: border-box;
            text-align: right;
        }
    }
}
</style>
<style lang="scss">
.show-box {
    opacity: 1 !important;
    top: 40% !important;
}
</style>