<template>
    <el-row class="add_version">
        <el-col :span="10">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
            <el-form-item label="版本号" prop="version">
                <el-input  v-model="ruleForm2.version" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本类型" prop="origin">
            <el-radio-group v-model="ruleForm2.origin">
                    <el-radio :label="1">国内</el-radio>
                    <el-radio :label="2">国际</el-radio>
                    <el-radio :label="3">PC</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="终端类型" prop="front">
            <el-radio-group v-model="ruleForm2.front">
                    <el-radio :label="1">安卓</el-radio>
                    <el-radio :label="2">苹果</el-radio>
                    <el-radio :label="3">PC</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="渠道" prop="pipe_id">
                <el-select v-model="ruleForm2.pipe_id" placeholder="请选择">
                    <el-option
                    v-for="item in pipeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否最新版本" prop="now">
                <el-select v-model="ruleForm2.now" placeholder="请选择">
                    <el-option
                    v-for="item in versionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" :rows="6" v-model="ruleForm2.desc" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import {addPackage,getPipes} from '@/api/api'
export default {
    data(){
        return{
            ruleForm2:{
                version:'', //版本号
                origin:'',
                front:'', //"终端类型 1：安卓， 2：苹果 3：PC",
                now:'',//是否最新版本
                pipe_id:'',  //渠道
                desc:''//版本描述
            },
            versionOptions:[
                {
                    label: '是',
                    value: true
                },
                {
                    label: '否',
                    value: false
                }
            ],
            pipeOptions:[],
            rules2:{
                version:[
                    { required: true, message: '请输入版本号', trigger: 'blur' }
                ],
                origin:[
                    { required: true, message: '请选择版本类型', trigger: 'change' }
                ],
                front:[
                    { required: true, message: '请选择终端类型', trigger: 'change' }
                ],
                pipe_id:[
                    { required: true, message: '请选择渠道', trigger: 'blur' }
                ],
                now:[
                    { required: true, message: '请选择是否最新版本', trigger: 'blur' }
                ]

            }
        }
    },
    mounted(){
         this.getPipesData();
    },
    methods:{
        getPipesData(){
            getPipes().then(
                res => {
                    if(res && res.results){
                        this.pipeOptions = res.results;
                    }else{
                        this.pipeOptions = [];
                    }
                }
            )
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const reqData = this.ruleForm2;
                addPackage(reqData).then(
                    res =>{
                        if(res && res.status == 'ok'){
                            this.$message.success('添加成功');
                            this.$router.go(-1);
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
        }
    }
}
</script>


<style lang="scss">
.add_version{
    .el-form-item__content{
        text-align: left;
    }

}
</style>


