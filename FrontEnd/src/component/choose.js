/**
 * Created by chenzhongying on 2017/10/23.
 */
import React from 'react';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import {connect,} from 'react-redux';
import {
    Page,
    Button,
    ButtonArea,
    Flex,
    FlexItem,
    Tab,
    TabBarItem,
    Article,
    IconArticle,
    InfiniteLoader,
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui/build/packages';
import weui from 'weui.js';
import Operate from './operate';
import store from '../store';
let YajinAndZujin = [];
let GenreCounts = [];
let TotalYajin = '';
let TotalZujin = '';
let HubNoList = [];//站点
let loading; //加载特效
let url = 'http://localhost';


class ChooseUi extends React.Component {
    componentDidMount() {
        this.props.fetchData(this.props.choose);
    }

    render() {
        const {toggle, chooseStyle, fetchData, choose, pickData, pickCity, multiselect} = this.props;
        return (
            <div id="moreTerm-wrap">
                <div id="moreTerm" style={{display: choose.toggleStatus ? 'block' : 'none'}}>
                    <div id="moreTerm-box">
                        <p>日期</p>
                        <Button type={choose.TimeType == 1 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 1, 'TimeType')}>今天</Button>
                        <Button type={choose.TimeType == 2 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 2, 'TimeType')}>本周</Button>
                        <Button type={choose.TimeType == 4 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 4, 'TimeType')}>本月</Button>
                        <Button type={choose.TimeType == 5 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 5, 'TimeType')}>上月</Button>
                        <Button type={choose.TimeType == 6 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 6, 'TimeType')}>近三月</Button>
                        <Button type={choose.TimeType == 7 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 7, 'TimeType')}>近半年</Button>
                        <Button type={choose.StarTime ? 'primary' : 'default'} size="small"
                                onClick={pickData.bind(this, 'StarTime')}>{choose.StarTime || '开始时间'}</Button>
                        <Button type={choose.EndTime ? 'primary' : 'default'} size="small"
                                onClick={pickData.bind(this, 'EndTime')}>{choose.EndTime || '结束时间'}</Button>
                        <p>平台</p>
                        <Button type={choose.Platform == 1 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 1, 'Platform')}>微信</Button>
                        <Button type={choose.Platform == 2 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 2, 'Platform')}>支付宝</Button>
                        <Button type={choose.Platform == 0 ? 'primary' : 'default'} size="small"
                                onClick={chooseStyle.bind(this, 0, 'Platform')}>全部平台</Button>
                        <p>区域</p>

                        <Button type={choose.areasStyle[0] ? 'primary' : 'default'} size="small"
                                onClick={multiselect.bind(this, choose,0)}>商场</Button>
                        <Button type={choose.areasStyle[1] ? 'primary' : 'default'} size="small"
                                onClick={multiselect.bind(this, choose,1)}>地铁</Button>
                        <Button type={choose.areasStyle[2] ? 'primary' : 'default'} size="small"
                                onClick={multiselect.bind(this,choose, 2)}>写字楼</Button>
                        <Button type={choose.areasStyle[3] ? 'primary' : 'default'} size="small"
                                onClick={multiselect.bind(this,choose, 3)}>酒店</Button>
                        <div className="clearfix">
                            <div style={{float: 'right'}}>
                                <Button size="small" style={{marginRight: '10px'}}
                                        onClick={(event) => {
                                            fetchData(choose);
                                            toggle();
                                        }}>确定</Button>
                                <Button type="default" size="small" onClick={toggle.bind(this)}>取消</Button>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <p>查询条件</p>
                    <div style={{marginBottom: '0.6rem'}}>
                        <Button type={choose.TimeType == 1 ? 'primary' : 'default'} size="small"
                                onClick={(event) => {
                                    chooseStyle(1, 'TimeType','check');
                                }}>今天</Button>
                        <Button type={choose.TimeType == 2 ? 'primary' : 'default'} size="small"
                                onClick={(event) => {
                                    chooseStyle(2, 'TimeType','check');
                                }}>本周</Button>
                        <Button type={choose.TimeType == 4 ? 'primary' : 'default'} size="small"
                                onClick={(event) => {
                                    chooseStyle(4, 'TimeType','check');
                                }}>本月</Button>
                        <Button size="small"
                                onClick={(event) => {
                                    pickCity(choose);
                                }}
                                id="pickCity">{choose.CityTxt}</Button>
                        <Button size="small" onClick={toggle.bind(this)}>更多</Button>
                    </div>

                </div>
                <div>
                    <Operate/>
                </div>
            </div>
        )
    }
}

function fetchData(choose, dispatch) {  //异步请求数据
    choose = $.param(choose);
    loading = weui.loading('loading', {
        className: 'custom-classname'
    });
    $.ajax({
        url: url + '/api/Report/MobileShow',
        type: 'POST',
        data: choose,
        complete: function (response) {
            response = JSON.parse(response.responseText);
            const data = response.data;
            if (response.state == 'success') {
                YajinAndZujin = data.YajinAndZujin;
                GenreCounts = data.GenreCounts;
                TotalYajin = data.TotalYajin;
                TotalZujin = data.TotalZujin;
                HubNoList = data.HubNoList; //站点

                let Yajin = []; //押金数组
                let Zujin = []; //租金数组
                let RecordTime = []; //收益明细时间数组
                let YajinAndZujinItem = []; //单项总计
                let GenreCountsBorrowCountTotal = 0;
                let GenreCountsReturnCountTotal = 0;
                let GenreCountsTotal = 0;
                for (let key in YajinAndZujin) {
                    Yajin.push(YajinAndZujin[key]['Yajin'] / 100);
                    Zujin.push(YajinAndZujin[key]['Zujin'] / 100);
                    RecordTime.push(YajinAndZujin[key]['RecordTime']);
                    YajinAndZujinItem.push(YajinAndZujin[key]['Yajin'] / 100 + YajinAndZujin[key]['Zujin'] / 100);
                }
                for (let i = 0; i < GenreCounts.length; i++) {
                    GenreCountsBorrowCountTotal += GenreCounts[i].BorrowCount;
                    GenreCountsReturnCountTotal += GenreCounts[i].ReturnCount;
                    GenreCountsTotal += (GenreCounts[i].BorrowCount + GenreCounts[i].ReturnCount);
                }
                dispatch({
                    type: 'DATA_REPORT',
                    YajinAndZujin: YajinAndZujin,
                    GenreCounts: GenreCounts,
                    TotalYajin: TotalYajin,
                    TotalZujin: TotalZujin,
                    Yajin: Yajin,
                    Zujin: Zujin,
                    RecordTime: RecordTime,
                    YajinAndZujinItem: YajinAndZujinItem,
                    umbrellaAllStatus: HubNoList, //站点
                    GenreCountsBorrowCountTotal: GenreCountsBorrowCountTotal,
                    GenreCountsReturnCountTotal: GenreCountsReturnCountTotal,
                    GenreCountsTotal: GenreCountsTotal
                });
                if (response.message) {
                    weui.alert(response.message);
                }
                let HubNoListStr = '';
                if (HubNoList.length > 10) {
                    for (var i = 0; i < 10; i++) {
                        HubNoListStr += 'HubList[]=' + HubNoList[i] + '&'
                    }
                    dispatch({
                        type: 'MOREUMBRELLA',
                        moreUmbrella: true,
                    })
                } else {
                    for (var i = 0; i < HubNoList.length; i++) {
                        HubNoListStr += 'HubList[]=' + HubNoList[i] + '&'
                    }
                    dispatch({
                        type: 'MOREUMBRELLA',
                        moreUmbrella: false
                    })
                }
                $.ajax({
                    url: url + '/api/Report/MobileHubShow',
                    data: HubNoListStr,
                    type: 'POST',
                    complete: function (response) {
                        response = JSON.parse(response.responseText);
                        loading.hide();
                        setTimeout(function () {
                            if (response.state == 'success') {
                                dispatch({
                                    type: 'UMBRELLA',
                                    umbrellaHubStatus: response.data.DataList
                                })
                            } else {
                                weui.alert(response.message);
                            }
                        }, 500);
                    }
                });

            } else {
                loading.hide();
                setTimeout(function () {
                    weui.alert(response.message);
                }, 500);
            }
        }
    });

};

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        choose: state.choose,
    }
}
function fn(value){
    return {
        type: 'CHOOSE_TIME',
        TimeType: value
    }
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch,ownprops) {
    return {
        multiselect: (choose,index) => {
            let areasStyle = [];
            let areasValue = [];
            for (let i = 0; i < choose.areasStyle.length; i++) {
                if (i == index) {
                    areasStyle.push(!choose.areasStyle[i])
                } else {
                    areasStyle.push(choose.areasStyle[i]);
                }

            }
            for (let i = 0; i < areasStyle.length; i++) {
                if (areasStyle[i] == true) {
                    areasValue.push(i);
                }
            }
            dispatch({
                type:'AREAS',
                'areasStyle': areasStyle,
                'Areas[]': areasValue
            });
        },
        pickCity: (choose) => {
            console.log(this);
            weui.picker([
                {
                    label: '全国',
                    value: ''
                    // disabled: true // 不可用
                },
                {
                    label: '广州',
                    value: '440100'
                },
                {
                    label: '北京',
                    value: '110100'
                },
                {
                    label: '深圳',
                    value: '440300'
                },
                {
                    label: '成都',
                    value: '510100'
                },
                {
                    label: '福州',
                    value: '350100'
                },
                {
                    label: '上海',
                    value: '310100'
                },
                {
                    label: '杭州',
                    value: '330100'
                },
                {
                    label: '嘉兴',
                    value: '330400'
                },
                {
                    label: '苏州',
                    value: '320500'
                },
                {
                    label: '东莞',
                    value: '441900'
                },
                {
                    label: '珠海',
                    value: '440400'
                },
                {
                    label: '南通',
                    value: '320600'
                }

            ], {
                className: 'custom-classname',
                container: 'body',
                onConfirm: function (result) {
                    dispatch({
                        type: 'CHOOSE_CITY',
                        City: result[0].value,
                        CityTxt: result[0].label
                    });
                    fetchData(store.getState().choose, dispatch);
                }
            });
        },
        toggle: () => dispatch({
            type: 'TOGGLE'
        }),
        chooseStyle: (value, type,check) => {
            switch (type) {
                case 'TimeType':
                    dispatch({
                        type: 'CHOOSE_TIME',
                        TimeType: value
                    });
                    if(check == 'check'){
                        fetchData(store.getState().choose, dispatch);
                    }
                    break;
                case 'Platform':
                    dispatch({
                        type: 'CHOOSE_PLATFORM',
                        Platform: value
                    });
                    break;
            }
        },
        fetchData: (choose, value, type) => {
            if (value) {
                choose[type] = value;
                fetchData(choose, dispatch);
            } else {
                if ((choose.StarTime && choose.EndTime) || (!choose.StarTime && !choose.EndTime)) {
                    fetchData(choose, dispatch);
                } else {
                    weui.alert('请选择正确的开始和结束时间');
                }
            }
        },
        pickData: (type) => {
            weui.datePicker({
                start: 1990,
                end: new Date().getFullYear(),
                defaultValue: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
                onConfirm: function (result) {
                    switch (type) {
                        case 'StarTime':
                            dispatch({
                                type: 'START_TIME',
                                StarTime: result[0].value + '-' + result[1].value + '-' + result[2].value,
                                TimeType: 8
                            });
                            break;
                        case 'EndTime':
                            dispatch({
                                type: 'END_TIME',
                                EndTime: result[0].value + '-' + result[1].value + '-' + result[2].value,
                                TimeType: 8
                            });
                            break;
                    }
                }
            });
        }
    }
};

// Connected Component
const Choose = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChooseUi);

export default Choose;
