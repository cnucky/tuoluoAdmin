<template>
    <div class="games_manage">
        <nav-head @activeIndex="getActiveIndex"></nav-head>
        <div>
            <div class="operate_btns">
                <el-button type="primary">导出</el-button>
                <el-button type="success" @click="addNewGame">添加游戏</el-button>
            </div>
            <el-table :data="tableData" border v-loading="loading" style="width: 100%" :header-cell-style="headerRowStyle">
                <el-table-column prop="id" label="ID" width="80px"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="图标">
                     <template slot-scope="scope">
                        <img :src="scope.row.image_url" width="100px" alt="">
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="提供商"></el-table-column>
                <el-table-column prop="name" label="备注"></el-table-column> -->
                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">下架</el-button> -->
                        <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
                        <el-button type="text" @click="handleDel(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page_block">
                <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 添加游戏 -->
        <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="form" ref="form" label-width="100px" :rules="rule">
                <el-form-item label="游戏名称" prop="name">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="游戏图标" prop="image_url">
                   <el-input v-model="form.image_url" class="icon_url" auto-complete="off"></el-input>
                   <el-upload class="avatar-uploader"
                    :action='uploadUrl'
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item class="modal_btns">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import mixin from '../mixins/mixin'
import navHead from '@/components/cmsNav'
import {addGames,getGamesList,delGame,updateGame} from '@/api/api'
export default {
    components:{navHead},
    data(){
        return{
            activeIndex: 0,
            tableData:[],
            dialogFormVisible: false,
            form:{
                name:'',
                image_url:'',
                type:''   //1 国内  2 国际  3 PC
            },
            uploadUrl: '/api/admin/upload/',
            imageUrl:'',
            loading: true,
            rule:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                image_url:[
                    { required: true, message: '请上传图标', trigger: 'blur' }
                ]
            },
            pageSizes:[20],
            pageSize: 20,
            total: 0,
            currentPage: 1,
            opeType: '',
            id:'',
            modalTitle:'添加游戏'
        }
    },
    mixins: [ mixin ],
    watch:{
        'activeIndex': function(newVal, oldVal){
            if(newVal == oldVal){
                return;
            }else{
                this.form.name = '';
                this.form.image_url = '';
                this.imageUrl = '';
            }   

        }
    },
    
    methods:{
        getActiveIndex(index){
            this.activeIndex = index;
            if(index == 0){ //APP国际
                this.form.type = 2
            }else if(index == 1){  //APP国内
                this.form.type = 1
            }else if(index == 2){  //PC客户端
                this.form.type = 3
            }
            this.getGamesListData();
        },
        handleClick(row){

        },
        handleEdit(row){
            this.dialogFormVisible = true;
            this.form.name = row.name;
            this.form.image_url = row.image_url;
            this.imageUrl = row.image_url;
            this.opeType = 'update';
            this.id = row.id;
            this.modalTitle = '修改游戏';
        },
        handleDel(row){
            const param = {
                id: row.id
            }
            delGame(param).then(
                res =>{
                    this.$message.success('删除成功');
                    this.getGamesListData();
                }
            ).catch(
                err =>{
                    console.log(err);
                }
            )
        },
        addNewGame(){
            this.dialogFormVisible = true;
            this.form.name = "";
            this.form.image_url = "";
            this.imageUrl = "";
            this.opeType = 'add';
            this.modalTitle = '添加游戏';
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.form.image_url = res.url;
        },
        beforeAvatarUpload(file) {
            console.log(file);
            let isJPG = false;
            let type = file.type;
            if(type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg'){
                isJPG = true
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传图标只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传图标大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                   const reqData = this.form;
                   console.log(this.opeType);

                   if(this.opeType == 'add'){
                       addGames(reqData).then(
                            res =>{
                                if(res && res.status == 'ok'){
                                    this.$message.success('添加成功');
                                    this.getGamesListData();
                                }else{
                                    this.$message.success('添加失败');
                                }
                                this.dialogFormVisible = false;
                            }
                        ).catch(
                            err=>{
                                console.log(err);
                            }
                        )
                   }else if(this.opeType == 'update'){
                       const param = {
                           id: this.id
                       }
                       updateGame(param,reqData).then(
                            res =>{
                                if(res && res.status == 'ok'){
                                    this.$message.success('修改成功');
                                    this.getGamesListData();
                                }else{
                                    this.$message.success('修改失败');
                                }
                                this.dialogFormVisible = false;
                            }
                        ).catch(
                            err=>{
                                console.log(err);
                            }
                        )
                   }

                   
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getGamesListData(){
            const param = {
                type: this.form.type
            }
            getGamesList(param).then(
                res =>{
                    if(res && res.results){
                        this.tableData = res.results;
                        this.total = res.count;
                        this.loading = false;
                    }else{
                        this.tableData = [];
                    }
                }
            ).catch(
                err=>{
                    console.log('err',err);
                }
            )
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
        
    }
}
</script>

<style lang="scss" scoped>
.games_manage{
    text-align: left;
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        border: 1px dashed #dcdfe6;
        text-align: center;
    }
    .avatar {
        width: 136px;
        height: 136px;
        display: block;
    }
    .operate_btns{
        margin: 0 0 20px 0;
    }
    .el-form-item__content{
        float: left;
        
    }
    .icon_url{
        display: none;
    }
}
</style>


