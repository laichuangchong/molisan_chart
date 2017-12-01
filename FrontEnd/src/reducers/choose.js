/**
 * Created by chenzhongying on 2017/10/30.
 */

var choose = function (state = {
    toggleStatus:false,
    CityTxt: '全国',
    City: '',
    MachineType:0,
    TimeType: 2,
    Platform: 0,
    StarTime:'',
    EndTime:'',
    'Areas[]': [],
    areasStyle: [false, false, false, false],
}, action) {
    switch (action.type) {
        case 'AREAS':
            return {
                ...state,
                'areasStyle': action.areasStyle,
                'Areas[]': action['Areas[]']
            };

        case 'TOGGLE':
            return {
                ...state,
                toggleStatus : !state.toggleStatus
            };

        case 'CHOOSE_CITY':
            return {
                ...state,
                City: action.City,
                CityTxt: action.CityTxt
            };

        case 'CHOOSE_TIME':
            return {
                ...state,
                TimeType: action.TimeType,
                StarTime:'',
                EndTime:''
            };
        case 'START_TIME':
            return {
                ...state,
                StarTime:action.StarTime,
                TimeType: action.TimeType
            };
        case 'END_TIME':
            return {
                ...state,
                EndTime:action.EndTime,
                TimeType: action.TimeType
            };
        case 'CHOOSE_PLATFORM':
            return {
                ...state,
                Platform:action.Platform
            };
        case 'CHOOSE_ALL':
            return {
                ...state,
                City: state.City,
                TimeType: state.TimeType,
                Platform: state.Platform,
                'Areas[]':state['Areas[]'],
                StarTime:state.StarTime,
                EndTime:state.EndTime
            };
        default:
            return state;
    }
};
export default choose;