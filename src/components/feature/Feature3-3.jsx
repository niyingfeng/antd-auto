// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';

const graph_conf = {
    
    type: 'graphList', // tableList graphList simpleObject complexObject 

    EchartStyle: {
        width: '100%',
        height: '450px'
    },

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){

        // 参考echarts 参数
        var option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ]
        }
       
       // 模拟数据
       Reqwest({
            url: '/api/example4',
            data: {},

            type: 'json',
            success: function (data) {
                option.series = data.data;
                option.series.forEach(function(item) {
                    item.type = 'line';
                    item.stack = '总量';
                });

                callback(option);
            }
        });
    }

};

const graph_conf2 = {
    
    type: 'graphList', // tableList graphList simpleObject complexObject 
    style: {
        width: '100%',
        height: '450px'
    },

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    // 将回调数据掺入option
    initData: function(callback){

        // 参考echarts 参数
        var option = {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            }
        }
       
        // 模拟数据
        setTimeout(function(){
            option.series = [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

            callback(option);
       }, 500)
    }

};

const graph_conf3 = {
    
    type: 'graphList', // tableList graphList simpleObject complexObject 
    style: {
        width: '100%',
        height: '450px'
    },

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    // 将回调数据掺入option
    initData: function(callback){


        var xAxisData = [];
        var data1 = [];
        var data2 = [];
        for (var i = 0; i < 100; i++) {
            xAxisData.push('类目' + i);
            data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
        }

        // 参考echarts 参数
        var option = {
            title: {
                text: '柱状图动画延迟'
            },
            legend: {
                data: ['bar', 'bar2'],
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        }
       
        // 模拟数据
        setTimeout(function(){
            
            option.series = [{
                name: 'bar',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }, {
                name: 'bar2',
                type: 'bar',
                data: data2,
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }]

            callback(option);
       }, 500)
    }

};

const Feature1 = FeatureSetConfig(graph_conf);
const Feature2 = FeatureSetConfig(graph_conf2);
const Feature3 = FeatureSetConfig(graph_conf3);

const Feature = (props) => {
    return  <div>
                <Feature1  className={props.className}/>
                <Feature2  className={props.className}/>
                <Feature3  className={props.className}/>
            </div>;
}

export default Feature;
