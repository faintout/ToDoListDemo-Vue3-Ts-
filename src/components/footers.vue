<template>
    <div class="footers">Copyright © 2014 faintout.github.io  <span @click="clear">clear</span></div>

</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'footers',
        components: {},
        setup(props, context) {
            const methods= {
                clear(){
                    context.emit('clear')
                }
            }
            return {
                ...methods
            }
        }
    })
</script>
<style lang="less">
    .footers {
        color: #666;
        font-size: 14px;
        text-align: center;
        span{
            color: #999;
        }
    }
</style>