<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in data" :key="item.value" :label="item.name" :name="item.value">
            </el-tab-pane>
        </el-tabs>
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeName: 0,
            data:[
                {
                    name:'APP国际',
                    value: '0'
                },
                {
                    name:'APP国内',
                    value: '1'
                },
                {
                    name:'PC客户端',
                    value: '2'
                }
            ]
        }
    },
    mounted(){
        this.$emit('activeIndex', this.activeName);
    },
    methods:{
        handleClick(tab,event){
            this.$emit('activeIndex', this.activeName);
        }
    }
}
</script>

