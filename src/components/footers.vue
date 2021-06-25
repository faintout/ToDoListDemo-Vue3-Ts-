<template>
    <div class="footers">
        <div>Copyright © 2014 faintout.github.io </div>
        
        <div @click="clear" class="footer_clear">&nbsp;clear</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'footers',
        components: {},
        setup(props, context) {
            const methods = {
                clear() {
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
    @import url('../assets/style/footers.less');
</style>