<template>
    <div class="recharge_users">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="用户ID" width="70px"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column label="是否是付费用户">
            <template slot-scope="scope">

                <!-- 是 -->
                <el-tag v-if="!!scope.row.is_charge_customer"
                :type="!!scope.row.is_charge_customer ? 'success' : 'error'"
                close-transition>是
                </el-tag>
                <!-- 否 -->
                <el-tag v-else
                :type="!!scope.row.is_charge_customer ? 'success' : 'error'"
                close-transition>否
                </el-tag>

            
            </template>
            </el-table-column>
            <el-table-column prop="origin_str" label="来源"></el-table-column>
            <!-- <el-table-column prop="account_end_time" label="截止时间"></el-table-column>
            <el-table-column label="赠送时间">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.account_extra_time }} 天</span>
            </template>
            </el-table-column> -->
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
import {getCustomers} from '@/api/api'
export default {
    data(){
        return{
            tableData: [],
            total:0,
            currentPage: 1,
            page: 1,
            pageSize:20

        }
    },
    mounted(){
        this.getCustomersData();
    },
    methods:{
        getCustomersData(){
            const param = {
                page: this.page,
                page_size: this.pageSize
            }
            getCustomers(param).then(
                res =>{
                    this.tableData = res.results;
                    this.total = res.count;
                }
            )
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.page = val;
            this.getCustomersData();
        }
    }
}
</script>

