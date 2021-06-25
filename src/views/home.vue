<template>
    <Headers @addText=addText />
    <div class="content">
        <div class="body">
            <h2>
                <div>正在进行</div>
                <span>{{list.filter(o=>!o.done).length}}</span>
            </h2>
            <div v-for="(item,index) in list" :key="index">
                <div v-if="!item.done" class="listItem">
                    <input type="checkBox" name="checkbox" :checked=item.done @click="item.done =!item.done,upDateList()">
                    <div class="_flex_space_between">
                        <div v-if="!isEditTitleStatus" @click="isEditTitleStatus=!isEditTitleStatus">
                            {{item.title}}
                        </div>
                        <div v-if="isEditTitleStatus">
                            <input type="text" name="title"  v-focus  v-model="item.title" @blur="isEditTitleStatus=!isEditTitleStatus,upDateList()">
                        </div>
                        <span class="_del_style" @click="del(index)">-</span>
                    </div>
                </div>
            </div>
            <h2>
                <div>已经完成</div>
                <span>{{list.filter(o=>o.done).length}}</span>
            </h2>
            <div v-for="(item,index) in list" :key="index" >
                <div v-if="item.done" class="_gray_border_left listItem ">
                    <input type="checkBox" :checked=item.done @click="item.done =!item.done,upDateList()">
                    <div class="_flex_space_between">
                        {{item.title}} <span class="_del_style" @click="del(index)">-</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <Footers @click="clear" />
</template>

<script lang="ts">
    import header from '../components/headers.vue'
    import footer from '../components/footers.vue'
    import { LocalFun } from './../utils/localStore'
    interface stateType {
        tempText: string,
            list: Array < object > ,
            localFun: any,
            isEditTitleStatus: boolean
    }
    import { defineComponent, ref, reactive, onMounted, toRefs, inject } from 'vue'
    export default defineComponent({
        name: 'home',
        components: {
            Headers: header,
            Footers: footer
        },
        directives: {
            focus: {
                mounted(el, binding, vnode) {
                    el.focus();
                },
            },
        },
        setup(props, context) {
            const state: stateType = reactive({
                tempText: '',
                list: [],
                isEditTitleStatus: false,
                localFun: new LocalFun()
            })
            onMounted(() => {
                //尝试从本地读取
                state.list = JSON.parse(state.localFun.local('listValue')) || []
            })
            const methods = {
                sele(e:any){
                    console.log(e);
                    e.currentTarget.select()
                    
                },
                del(index: number) {
                    state.list.splice(index, 1)
                    methods.upDateList()
                },
                upDateList() {
                    state.localFun.local('listValue', JSON.stringify(state.list))
                },
                addText(text: string) {
                    if (text) {
                        let tempObj = {
                            title: text,
                            done: false
                        }
                        state.list.push(tempObj)
                        methods.upDateList()
                    }
                },
                clear(){
                    if(confirm('Do you want to clear all lists?')){
                        state.list = []
                        methods.upDateList()
                    }else{
                        alert('Welcome next time! love,you')
                    }
                }
            }
            return {
                ...toRefs(state),
                ...methods
            }
        }
    })
</script>
<style lang="less">
     @import url('../assets/style/content.less');
</style>