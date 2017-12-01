/**
 * Created by chenzhongying on 2017/10/29.
 */
var itemsReducer = function (state = [], action) {
    console.log(state,action);
    switch(action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}
export default itemsReducer;