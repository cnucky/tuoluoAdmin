<template>
    <div> 
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="order_id" label="订单id"></el-table-column>
            <el-table-column prop="origin_str" label="充值方式"></el-table-column>

            <el-table-column prop="charge_str" label="充值类型"></el-table-column>
            
            <el-table-column label="充值金额">
                <template slot-scope="scope">
                    {{scope.row.amount_yuan}}元
                </template>
            </el-table-column>
            
            <el-table-column prop="status_show" label="状态"></el-table-column>
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
import {getOrdersList} from '@/api/api'
export default {
    data(){
        return{
            tableData:[],
            total:0,
            pageSize: 20,
            currentPage: 1,
        }
    },
    mounted(){
        this.getOrdersListData();
    },
    methods:{
        getOrdersListData(){
            const param = {
                page: this.currentPage,
                page_size: this.pageSize
            }
            getOrdersList(param).then(
                res =>{
                    this.tableData = res.results;
                    this.total = res.count;
                }
            )
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getOrdersListData();
        }
    }
}
</script>

