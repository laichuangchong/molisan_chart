/**
 * Created by chenzhongying on 2017/10/30.
 */

const data = function (state = {
    tab: 0,
    YajinAndZujin: [],
    GenreCounts:[],
    umbrellaHubStatus:[],
    Yajin:[],
    Zujin:[],
    RecordTime:[]
}, action) {
    switch (action.type) {
        case 'TAB':
            return{
                ...state,
                tab:action.tab
            };
        case 'DATA_REPORT':
            return {
                ...state,
                YajinAndZujin: action.YajinAndZujin,
                GenreCounts: action.GenreCounts,
                TotalYajin: action.TotalYajin,
                TotalZujin: action.TotalZujin,
                Yajin: action.Yajin,
                Zujin: action.Zujin,
                RecordTime: action.RecordTime,
                YajinAndZujinItem: action.YajinAndZujinItem,
                umbrellaAllStatus: action.umbrellaAllStatus,
                GenreCountsBorrowCountTotal: action.GenreCountsBorrowCountTotal,
                GenreCountsReturnCountTotal: action.GenreCountsReturnCountTotal,
                GenreCountsTotal: action.GenreCountsTotal
            };
        case 'UMBRELLA':
            return {
                ...state,
                umbrellaHubStatus: action.umbrellaHubStatus
            };

        case 'MOREUMBRELLA':
            return {
                ...state,
                moreUmbrella: action.moreUmbrella
            };
        default:
            return state;
    }
};
export default data;