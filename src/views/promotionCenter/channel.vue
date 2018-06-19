<template>
    <div>
        <div class="btns">
            <el-button type="success" @click="addPipe">添加渠道</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="160px"></el-table-column>
            <el-table-column prop="name" label="渠道名称"></el-table-column>
            <el-table-column prop="code" label="渠道code"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>

        <!--添加线路-->
        <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible"  width="500px">
            <el-form :model="form" label-width="100px" :rules="modalRules" ref="form">
                <el-form-item label="渠道名称" prop="name">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="渠道code" prop="code">
                    <el-input v-model="form.code" auto-complete="off"></el-input>
                </el-form-item>
               
                <el-form-item class="modal_footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                </el-form-item>
            </el-form>
            
        </el-dialog>

    </div>
</template>

<script>
import{getPipes,addPipe} from '@/api/api'

export default {
    data(){
        return{
            tableData:[],
            total:0,
            pageSize: 20,
            currentPage: 1,
            dialogFormVisible: false,
            form:{
                name:'',
                code:''
            },
            modalTitle: '添加渠道',
            modalRules:{
                name:[
                    { required: true, message: '请输入渠道名称', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入渠道code', trigger: 'blur' }
                ] 
            }
        }
    },
    mounted(){
        this.getPipeListData();
    },
    methods:{
        addPipe(){
            this.dialogFormVisible = true;
            this.form.name = '';
            this.form.code = '';
        },
        getPipeListData(){
            const param = {
                page: this.currentPage,
                page_size: this.pageSize
            }
            getPipes(param).then(
                res => {
                    this.tableData = res.results;
                    this.total = res.count;
                }
            )
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getPipeListData();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const reqData = this.form;
                addPipe(reqData).then(
                    res =>{
                        if(res){
                            this.$message.success('添加成功');
                            this.dialogFormVisible = false;
                            this.getPipeListData();
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
    }
}
</script>

<style lang="scss" scoped>
.btns{
    text-align: left;
    margin:0 0 20px 0;
}
.modal_footer{
    text-align: right;
}
</style>


