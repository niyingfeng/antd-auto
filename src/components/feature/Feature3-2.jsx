// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';

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

const Feature = FeatureSetConfig(graph_conf2);

export default Feature;
