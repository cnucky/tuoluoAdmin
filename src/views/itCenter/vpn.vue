<template>
    <div>
        <div class="btns">
            <el-button type="success" @click="addVpn">添加线路</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="160px"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="tun_port" label="端口"></el-table-column>
            <el-table-column label="带宽">
                <template slot-scope="scope">
                    {{scope.row.band}}M
                </template>
            </el-table-column>
           
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
                <el-form-item label="线路名称" prop="name">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="线路ip" prop="ip">
                    <el-input v-model="form.ip" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="带宽大小" prop="band">
                    <el-input v-model="form.band" auto-complete="off"></el-input>
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
import{getVpnList,addVpn} from '@/api/api'

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
                ip:'',
                band:''
            },
            modalTitle: '添加线路',
            modalRules:{
                name:[
                    { required: true, message: '请输入线路名称', trigger: 'blur' }
                ],
                ip:[
                    { required: true, message: '请输入线路ip', trigger: 'blur' }
                ],
                band:[
                    { required: true, message: '请输入带宽', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.getVpnListData();
       
    },
    methods:{
        
        addVpn(){
            this.dialogFormVisible = true;
            this.form.name = '';
            this.form.ip = '';
            this.form.band = '';
        },
        getVpnListData(){
            const param = {
                page: this.currentPage,
                page_size: this.pageSize
            }
            getVpnList(param).then(
                res => {
                    this.tableData = res.results;
                    this.total = res.count;
                }
            )
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getVpnListData();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const reqData = this.form;
                addVpn(reqData).then(
                    res =>{
                        if(res && !!res.vpn_host){
                            this.$message.success('添加成功');
                            this.dialogFormVisible = false;
                            this.getVpnListData();
                        }else {
                            this.$message.success('添加失败');
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


