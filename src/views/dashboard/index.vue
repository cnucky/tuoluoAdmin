<template>
  <div>
    <div class="clearfix date_filter">
      <!-- 日期筛选 -->
      <div class="daterange_block">
        <span class="demonstration">日期：</span>
        <el-date-picker
          v-model="date_time"
          type="daterange"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <el-button type="primary" class="search_btn" icon="el-icon-search" @click="getNewData">搜索</el-button>
      
    </div>
    <el-card class="box-card">
      <ul class="clearfix">
        <li v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
        </li>
      </ul>
      
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import{getEcharts, getPublicEcharts, getGicEcharts} from '@/api/api'
export default {
  data(){
    return {
      echart_data:[],
      public_echart_data:[],
      public_echart_legend:[],
      gic_echart_data:[],
      r:'',
      g:'',
      b:'',
      color:'',
      interval:'',
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      
    },
    date_time: ''
    }
  },
  created () {
    
  },
  methods: {
    getNewData(){

    }
    

  }
}
</script>
<style lang="scss">
.refresh_echart{
  float: right;
  margin: 0 10% 0 0;
  cursor: pointer;
}
#main{
  clear: both;
}
.daterange_block,.search_btn{
  float: left;
}
.search_btn{
  margin: 0 0 0 30px;
}
.date_filter{
  margin: 0px 0 30px 0;
}
.box-card{
  ul{
    padding: 0;
    li{
      list-style: none;
      width: 24%;
      float: left;
      border: 1px solid #e9e9e9;
      margin: 0 15px 0 0;
      border-radius: 5px;
      padding: 20px;
    }
    li:last-child{
      margin: 0;
    }
  }
}
</style>


