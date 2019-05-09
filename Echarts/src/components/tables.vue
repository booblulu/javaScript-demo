<template>
    <div id="box">
        <div id="1"></div>
        <div id="2"></div>
        <div id="3"></div>   
        <div id="4"></div>
        <div id="5"></div>
        <div id="6"></div>
        <div id="pie"></div>
        <div id="bar"></div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    name: "tables",
    data () { 
        return {}
    },
    methods: {
        $(id){
            return typeof id === "string" ? document.getElementById(id) : null;
        }
    },
    mounted () {        
        // 柱状图
        // 基于准备好的dom，初始化echarts实例
        let barChart = echarts.init(this.$('bar'));   

        // 指定图表的配置项和数据
        var option = {
            // 默认背景
            backgroundColor: 'rgba(255,255,255,1)',
            // 柱形颜色
            color:['#06a45f', '#078ed6', '#e3982f'],
            // 标题
            title: {
                text: '柱形图'
            },
            // 提示
            tooltip: {},
            // 图例
            legend: {
                // 图例排项 vertical-"竖向"; horizontal-"横向"
                orient: 'horizontal',
                // 图例组件离容器左侧的距离
                right : 40,
                data:['销量']
            },
            // x轴
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫"]
            },
            // y轴
            yAxis: {},
            // 提示信息           
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36,]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        barChart.setOption(option);  
        var pieData=[
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ];
        // 饼图        
        let pieChart = echarts.init(this.$('pie'));
        pieChart.showLoading();
        pieChart.setOption({
            // 默认背景
            backgroundColor: 'rgba(255,255,190,1)',
            title: {
                text: '饼图',
                // subtext: '模拟数据',        // 副标题
                // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                x: 'center',
                // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                y: 'top',
                // itemGap: 30,               // 设置主副标题纵向间隔，单位px，默认为10
                // backgroundColor: '#EEE',   // 标题背景
                // 主标题文本样式设置
                textStyle: {
                    fontSize: 26,
                    fontWeight: 'bolder',
                    color: '#000080'                
                },
                // 副标题文本样式设置
                // subtextStyle: {
                //     fontSize: 18,
                //     color: '#8B2323'
                // }
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                icon:"circle",
                textStyle:{
                    rich:{
                        a:{
                            fontSize:16,
                            color:"#EA5504",
                            padding:10
                        },
                        b:{
                            fontSize:14,
                            color:"#333"
                        }
                    }
                }

            },           
            tooltip: {
                // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
                trigger: 'item',
                showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                hideDelay: 20,   // 隐藏延迟，单位ms
                // formatter设置提示框显示内容
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{a} <br/>{b} : {c}个 ({d}%)'
            },
            // 修改视觉引导线的颜色
            // labelLine: {
            //     lineStyle: {
            //         color: 'rgba(255, 255, 255, 0.3)'
            //     }
            // },
            // 明暗度
            visualMap: {
                // 不显示 visualMap 组件，只用于明暗度的映射
                show: false,
                // 映射的最小值为 80
                min: 80,
                // 映射的最大值为 600
                max: 600,
                inRange: {
                    // 明暗度的范围是 0 到 1
                    colorLightness: [0, 1]
                }
            },
            series : [                
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
                    // radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                    center: ['55%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                    data:[
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    // 改成南丁格尔图
                    // roseType: 'angle',
                    itemStyle: {
                        // 设置扇形的颜色
                        color: '#c23531',
                        emphasis: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
        // 当异步加载数据的时候，可以使用加载中的样式，数据加载完成再隐藏。
        pieChart.hideLoading();

        
        
        // 窗口缩小一起缩小 
        window.addEventListener('resize',() => {
            barChart.resize();
            pieChart.resize();
        })
    }
}
</script>

<style lang="css">
#box {
    width: 900px;
    height: 600px;
    margin: 0 auto;
    background: pink;
}
#bar, #pie {
    width: 300px;
    height: 200px;
}
</style>