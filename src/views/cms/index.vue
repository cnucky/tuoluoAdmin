<template>
    <div class="games_manage">
        <nav-head @activeIndex="getActiveIndex"></nav-head>
        <div>
            <div class="operate_btns">
                <el-button type="primary">导出</el-button>
                <el-button type="success" @click="addNewGame">添加游戏</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="headerRowStyle">
                <el-table-column prop="date" label="ID"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="name" label="图标"></el-table-column>
                <el-table-column prop="name" label="提供商"></el-table-column>
                <el-table-column prop="name" label="备注"></el-table-column>
                <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">下架</el-button>
                    <el-button type="text" @click="handleEdit(scope.row)"  size="small">编辑</el-button>
                    <el-button type="text" @click="handleDel(scope.row)"  size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加游戏 -->
        <el-dialog title="添加游戏" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="form" :ref="form" label-width="100px">
                <el-form-item label="游戏名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="游戏供应商">
                    <el-input v-model="form.supplier" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="游戏图标">
                   <el-upload class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="2" v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
import mixin from '../mixins/mixin'
import navHead from '@/components/cmsNav'
export default {
    components:{navHead},
    data(){
        return{
            activeIndex: 0,
            tableData:[],
            dialogFormVisible: false,
            form:{
                name:'',
                supplier:'',
                icon:'',
                remark:''
            },
            uploadUrl:'',
            imageUrl:'',
          


        }
    },
    mixins: [ mixin ],
    methods:{
        getActiveIndex(index){
            this.activeIndex = index;
            if(index == 0){ //APP国际

            }else if(index == 1){  //APP国内

            }else if(index == 2){  //PC客户端

            }
        },
        handleClick(row){

        },
        handleEdit(row){

        },
        handleDel(){

        },
        addNewGame(){
            this.dialogFormVisible = true;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
        width: 178px;
        height: 178px;
        display: block;
    }
    .operate_btns{
        margin: 0 0 20px 0;
    }
    .el-form-item__content{
        float: left;
        
    }
}
</style>


