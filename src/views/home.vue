<template>
    <input type="text" v-model="tempText" @keyup.enter="add()">
    <div>正在进行</div>
    <div v-for="(item,index) in list" :key="index">
        <div v-if="!item.done">
            <input type="checkBox" :checked=item.done @click="item.done =!item.done,upDateList()">{{item.title}} <span @click="del(index)">x</span>
        </div>
    </div>
    <div>已经完成</div>
    <div v-for="(item,index) in list" :key="index" style="color:#ccc">
        <div v-if="item.done">
            <input type="checkBox" :checked=item.done @click="item.done =!item.done,upDateList()">{{item.title}} <span @click="del(index)">x</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { LocalFun } from './../utils/localStore'
    interface stateType {
        tempText: string,
            list: Array < object > ,
            localFun: any
    }
    import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
    export default defineComponent({
        name: 'home',
        components: {},
        setup(props, context) {
            const state: stateType = reactive({
                tempText: '',
                list: [],
                localFun: new LocalFun()
            })
            onMounted(() => {
                //尝试从本地读取
                state.list = JSON.parse(state.localFun.local('listValue')) || []
            })
            const methods = {
                del(index: number) {
                    state.list.splice(index, 1)
                    methods.upDateList()
                },
                upDateList() {
                    state.localFun.local('listValue', JSON.stringify(state.list))
                },
                add() {
                    methods.upDateList()
                    if (state.tempText) {
                        let tempObj = {
                            title: state.tempText,
                            done: false
                        }
                        state.list.push(tempObj)
                    }
                },
            }
            return {
                ...toRefs(state),
                ...methods
            }
        }
    })
</script>