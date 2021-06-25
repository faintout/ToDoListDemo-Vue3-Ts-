<template>
    <div class="headers_fixed"></div>
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
    @import url('../assets/style/headers.less');
</style>