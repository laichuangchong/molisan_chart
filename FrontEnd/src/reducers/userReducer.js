/**
 * Created by chenzhongying on 2017/10/29.
 */

var userReducer = function(state = {},action) {
    console.log(state, action);
    switch(action.type){
        case 'SET_NAME':
            return {
                ...state,
                name:action.name
            };
        default:
            return state;
    }
}
export default userReducer;