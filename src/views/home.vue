<template>
    <headers @addText=addText />
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
    <footers @click="clear" />
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
            headers: header,
            footers: footer
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
    .content {
        width: 100%;
        height: calc(100% - 50px);
        width: 600px;
        margin: 0 auto;
    }

    .body h2 {
        margin: 0.82em 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            // position: absolute;
            position: relative;
            top: -3px;
            right: 5px;
            display: inline-block;
            padding: 0 5px;
            height: 20px;
            border-radius: 20px;
            background: #E6E6FA;
            line-height: 22px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    }
    ._gray_border_left{
            border-left: 5px solid #999 !important;
            opacity: 0.5;
    }
    .listItem {
        height: 32px;
        line-height: 32px;
        background: #fff;
        position: relative;
        margin-bottom: 10px;
        padding: 0 45px;
        border-radius: 3px;
        border-left: 5px solid #629A9C;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 7%);

        >input {
            position: absolute;
            top: 5px;
            left: 14px;
            width: 22px;
            height: 22px;
            cursor: pointer;
        }
    }

    ._flex_space_between {
        display: flex;
        justify-content: space-between;

        div {
            width: 80%;
        }

        input {
            top: 3px;
            left: 40px;
            width: 100%;
            height: 20px;
            line-height: 14px;
            text-indent: 5px;
            font-size: 14px;
        }
    }

    ._del_style {
        position: relative;
        top: 2px;
        right: -40px;
        display: inline-block;
        width: 14px;
        height: 12px;
        border-radius: 14px;
        border: 6px double #FFF;
        background: #CCC;
        line-height: 14px;
        text-align: center;
        color: #FFF;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
</style>