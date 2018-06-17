<template>
    <div>
        <nav-head @activeIndex="getActiveIndex"></nav-head>
        <div class="add_amount">
            <el-form :model="form" :inline="true" :rules="rules2" ref="form" label-width="80px" class="demo-ruleForm">
                <el-form-item label="充值面额" prop="money">
                    <el-input v-model.number="form.money" auto-complete="off"></el-input>分
                </el-form-item>
                <el-form-item label="时间" prop="day">
                    <el-input v-model.number="form.day" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select class="date_unit" v-model="day" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">添加</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="tableData" v-loading="loading" border style="width: 70%">
                <el-table-column label="面额">
                    <template slot-scope="scope">
                        <span>{{scope.row.money}}分</span>
                    </template>
                </el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.day}}天</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import navHead from '@/components/cmsNav'
import{addAmount,getAmountList, delAmount} from '@/api/api'

export default {
    data(){
        var checkNum = (rule, value, callback) => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        
        };
        return{
            activeIndex: 0,
            form:{
                origin:'',
                money:'',
                day:''
            },
            rules2:{
                money:[
                    { required: true, message: '请输入金额', trigger: 'blur' },
                    { validator: checkNum, trigger: 'blur' }
                ],
                day:[
                    
                    { required: true, message: '请输入天数', trigger: 'blur' },
                    { validator: checkNum, trigger: 'blur' }
                ]

            },
            options:[
                {
                    value: 0,
                    label: '天'
                }
            ],
            day: 0,
            tableData:[],
            loading: true,
            

        }
    },
    components:{navHead},
    watch:{
        'activeIndex': function(newVal, oldVal){
            if(newVal == oldVal ){
                return;
            }
            this.loading = true;
            this.resetForm('form');
        }
    },
    methods:{
        getActiveIndex(index){
            this.activeIndex = index;
            if(index == 0){ //APP国际
                this.form.origin = 2
            }else if(index == 1){  //APP国内
                this.form.origin = 1
            }else if(index == 2){  //PC客户端
                this.form.origin = 3
            }
            this.getAmountListData();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const reqData = this.form;
                addAmount(reqData).then(
                    res =>{
                        if(res && res.status == 'ok'){
                            this.$message.success('添加成功');
                            this.getAmountListData();
                           
                        }else{
                            this.$message.error('添加失败');
                        }

                        
                    }
                )
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getAmountListData(){
            const param = {
                type: this.form.origin
            }
            getAmountList(param).then(
                res =>{
                    if(res && res.results){
                        this.tableData = res.results;
                        this.loading = false;
                    }
                }
            )
        },
        handleClick(row){
            const param = {
                id: row.id
            }
            delAmount(param).then(
                res => {
                    this.$message.success('删除成功');
                    this.getAmountListData();
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.add_amount{
    text-align: left;
    padding: 20px 0;
    .date_unit{
        width: 70px;
    }
    .el-input{
        width: 80%;
        margin: 0 10px 0 0;
    }
}
</style>


