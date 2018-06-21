<template>
    <div>
        <div class="btns">
            <el-button type="success" @click="addNewVersion">添加版本</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="50px"></el-table-column>
            <el-table-column prop="version" label="版本号" width="160px"></el-table-column>
            <el-table-column prop="package_name" width="160px" label="安装包名称"></el-table-column>
            <el-table-column prop="origin_str" width="100px" label="版本类型"></el-table-column>
            <el-table-column prop="front_str" width="90px" label="终端类型"></el-table-column>
            <el-table-column prop="pipe_name" width="90px" label="渠道名称"></el-table-column>
            
              
            <el-table-column prop="download_url" width="220px" label="下载地址"></el-table-column>
            <el-table-column width="160px" label="添加时间">
                <template slot-scope="scope">
                    {{date(scope.row.created_at)}}
                </template>
            </el-table-column>
            <el-table-column label="是否最新版本" width="110px">
            <template slot-scope="scope">
                <!-- 是 -->
                <el-tag v-if="!!scope.row.now" :type="!!scope.row.now ? 'success' : 'error'" close-transition>是</el-tag>
                <!-- 否 -->
                <el-tag v-else :type="!!scope.row.now ? 'success' : 'error'"
                close-transition>否
                </el-tag>
            </template>
            </el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
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
    </div>
</template>

<script>
import{getPackageList} from '@/api/api'
import moment from 'moment'
moment.locale('zh-cn')
export default {
    data(){
        return{
            tableData:[],
            total:0,
            pageSize: 20,
            currentPage: 1
        }
    },
    mounted(){
        this.getVersionList();
    },
    methods:{
        date (date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss')
        },
        addNewVersion(){
            this.$router.push({name:'VersionEdit'});
        },
        getVersionList(){
            const param = {
                page: this.currentPage,
                page_size: this.pageSize
            }
            getPackageList(param).then(
                res => {
                    this.tableData = res.results;
                    this.total = res.count;
                }
            )
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getVersionList();
        }
    }
}
</script>

<style lang="scss" scoped>
.btns{
    text-align: left;
    margin:0 0 20px 0;
}
</style>


