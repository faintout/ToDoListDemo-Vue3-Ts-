<template>
    <div class="headers">
        <div class="title">
            <div class="titleText">ToDoList</div>
            <input type="text" placeholder="添加ToDo" required="required" autocomplete="off" v-model="tempText" @keyup.enter="add()">
        </div>
    </div>
</template>

<script lang="ts">
    interface stateType {
        tempText: string
    }
    import { defineComponent, ref, reactive, toRefs } from 'vue'
    export default defineComponent({
        name: 'headers',
        components: {},
        setup(props, context) {
            const state: stateType = reactive({
                tempText: '',
            })
            const methods = {
                add() {
                    context.emit('addText', state.tempText)
                    state.tempText = ''
                },
            }
            return {
                ...methods,
                ...toRefs(state)
            }
        },
    })
</script>

<style lang="less">
    .headers {
        height: 50px;
        background: #333;
        background: rgba(47, 47, 47, 0.98);

        .title {
            width: 600px;
            margin: 0 auto;

            .titleText {
                float: left;
                width: 100px;
                line-height: 50px;
                color: #DDD;
                font-size: 24px;
                cursor: pointer;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }

            input {
                padding: 1px 2px;
                outline: none;
                float: right;
                width: 60%;
                height: 24px;
                margin-top: 12px;
                text-indent: 10px;
                border-radius: 5px;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 24%), 0 1px 6px rgba(0, 0, 0, 45%) inset;
                border: none;
            }
        }
    }
</style>