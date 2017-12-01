/**
 * Created by chenzhongying on 2017/10/24.
 */
import React from 'react';
import {connect,} from 'react-redux';
import echarts from 'echarts';
import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem,
    Article
} from 'react-weui/build/packages';
import weui from 'weui.js';

require('es6-promise').polyfill();
require('isomorphic-fetch');
let url = 'http://localhost';
let loading; //加载特效
let myChart;
let umbrellaIndex = 10;//初始化伞机请求的数组位置


class OperateUi extends React.Component {
    componentDidMount(){
        myChart = echarts.init(document.getElementById('chart'));
    };
    componentDidUpdate(){
        console.log(3)
        this.props.chartShow(this.props.data);
    }
    render() {
        const {
            data,
            moreUmbrella,
            changeTab,
            chartShow
        } = this.props;
        return (
            <div>
                <NavBar>
                    <NavBarItem active={data.tab == 0}
                                onClick={e => changeTab(0)}>订单收益</NavBarItem>
                    <NavBarItem active={data.tab == 1}
                                onClick={e => changeTab(1)}>使用统计</NavBarItem>
                    <NavBarItem active={data.tab == 2}
                                onClick={e => changeTab(2)}>设备收益</NavBarItem>
                </NavBar>
                <TabBody>
                    <Article style={{display: data.tab == 0 ? null : 'none'}}>
                        <section>
                            <section>
                                <div id="chart" style={{width: '100%', height: 250}}></div>
                            </section>
                            <section>
                                <div>
                                    <h3>收益明细</h3>
                                    <table className="table table-striped table-bordered table-condensed">
                                        <thead>
                                        <tr>
                                            <th>时间</th>
                                            <th>押金</th>
                                            <th>租金</th>
                                            <th>总计</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data.YajinAndZujin.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{item.RecordTime}</td>
                                                        <td>{(item.Yajin / 100).toFixed(1)}</td>
                                                        <td>{(item.Zujin / 100).toFixed(1)}</td>
                                                        <td>{((item.Yajin / 100) + (item.Zujin / 100)).toFixed(1)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td>总计</td>
                                            <td>{(data.TotalYajin / 100).toFixed(1)}</td>
                                            <td>{(data.TotalZujin / 100).toFixed(1)}</td>
                                            <td>{((data.TotalYajin / 100) + (data.TotalZujin / 100)).toFixed(1)}</td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </section>
                        </section>
                    </Article>
                    <Article style={{display: data.tab == 1 ? null : 'none'}}>
                        <section>
                            <section>
                                <table className="table table-striped table-bordered table-condensed">
                                    <thead>
                                    <tr>
                                        <th>时间</th>
                                        <th>借出次数</th>
                                        <th>归还次数</th>
                                        <th>总计</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.GenreCounts.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.RecordTime}</td>
                                                    <td>{item.BorrowCount}</td>
                                                    <td>{item.ReturnCount}</td>
                                                    <td>{parseInt(item.BorrowCount) + parseInt(item.ReturnCount)}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td>总计</td>
                                        <td>{data.GenreCountsBorrowCountTotal}</td>
                                        <td>{data.GenreCountsReturnCountTotal}</td>
                                        <td>{data.GenreCountsTotal}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </section>

                        </section>
                    </Article>
                    <Article style={{display: data.tab == 2 ? null : 'none'}}>
                        <section>
                            <section>
                                <table className="table table-striped table-bordered table-condensed">
                                    <thead>
                                    <tr>
                                        <th width="46%">设备编号</th>
                                        <th>借出次数</th>
                                        <th>归还次数</th>
                                        <th>总收益</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.umbrellaHubStatus.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.HubName}</td>
                                                    <td>{item.BorrowCount}</td>
                                                    <td>{item.ReturnCount}</td>
                                                    <td>{item.Zujin}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        {
                                            data.moreUmbrella ? (
                                                <td colSpan="4" style={{textAlign: 'center'}}
                                                onClick={moreUmbrella.bind(this,data)}>
                                                    点击加载更多
                                                </td>) : (<td colSpan="4" style={{textAlign: 'center'}}>
                                                加载完毕
                                            </td>)
                                        }
                                    </tr>
                                    </tfoot>
                                </table>
                            </section>
                        </section>
                    </Article>
                </TabBody>
            </div>
        )
    }
}
function chartShow(data){
    myChart.setOption({
        title: {text: ''},
        tooltip: {
            show: true
        },
        axisPointer: {
            show: true
        },
        legend: {
            data: ['租金', '押金', '总计']
        },
        xAxis: {
            data: data.RecordTime
        },
        yAxis: {},
        series: [
            {
                name: '租金',
                type: 'line',
                data: data.Zujin
            },
            {
                name: '押金',
                type: 'line',
                data:data.Yajin
            },
            {
                name: '总计',
                type: 'line',
                data: data.YajinAndZujinItem
            }
        ]
    });
}
function mapStateToProps(state) {
    return {
        data:state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeTab: (value) => dispatch({
            type: 'TAB',
            tab: value
        }),
        chartShow:(data)=>{
            chartShow(data);
        },
        moreUmbrella:(data)=> {
            let umbrellaAllStatus = data.umbrellaAllStatus;
            let HubNoList = [];//请求站点数组
            if(umbrellaAllStatus.length-umbrellaIndex>10){
                for (let i = umbrellaIndex; i < umbrellaIndex+10; i++) {
                    HubNoList.push(umbrellaAllStatus[i])
                }
            }else if((umbrellaAllStatus.length-umbrellaIndex)<=10 && umbrellaAllStatus.length-umbrellaIndex>0){
                for (let i = umbrellaIndex; i < umbrellaAllStatus.length; i++) {
                    HubNoList.push(umbrellaAllStatus[i])
                }

            }else{
                dispatch({
                    type:'MOREUMBRELLA',
                    moreUmbrella:false
                    });
                return false;
            }
            let HubList = $.param({'HubList[]':HubNoList});

            loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            $.ajax({
                url: url + '/api/Report/MobileHubShow',
                type: 'POST',
                data: HubList,
                complete: function (response) {
                    response = JSON.parse(response.responseText);
                    loading.hide();
                    setTimeout(function () {
                        if (response.state == 'success') {
                            umbrellaIndex +=10;
                            console.log(response);
                            loading.hide();
                            dispatch({
                                type:'UMBRELLA',
                                umbrellaHubStatus:data.umbrellaHubStatus.concat(response.data.DataList)
                            });
                        } else {
                            weui.alert(response.message);
                        }
                    }, 500);
                }
            })


        }
    }
}

const Operate = connect(
    mapStateToProps,
    mapDispatchToProps
)(OperateUi);
export default Operate;