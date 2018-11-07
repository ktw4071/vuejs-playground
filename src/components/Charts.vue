<template>
    <section>
    <div class="col1">
        <el-card class="box-card">
            <chart></chart>
        </el-card>
        

        <el-card class="box-card">
            <pie-chart></pie-chart>
        </el-card>

        <el-card class="box-card">
            <radar-chart></radar-chart>
        </el-card>
    </div>

    <div class="col2">
        <el-card class="box-card">
            <line-chart></line-chart>
        </el-card>
        <el-card class="box-card">
            <doughnut-chart></doughnut-chart>
        </el-card>
        <el-card class="box-card">
            <bubble-chart></bubble-chart>
        </el-card>
    </div>
    </section>
</template>

<style>
    .box-card{
        
        width: 50rem;
        height: 30rem;
        margin-bottom: 3rem;
    }
</style>

<script>
    import Chart from './sub_components/bar-chart'
    import LineChart from './sub_components/line-chart'
    import PieChart from './sub_components/pie-chart'
    import DoughnutChart from './sub_components/doughnut-chart'
    import RadarChart from './sub_components/radar-chart'
    import BubbleChart from './sub_components/bubble-chart'


    export default {
        components: {
            Chart,
            LineChart,
            PieChart,
            DoughnutChart,
            RadarChart,
            BubbleChart

        }
        
    }
</script>