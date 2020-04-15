import { postConstants } from '../_constants/post';

const initialState = {loading: true, saving: false, list: [], totalPage: 0, curenPage: 1, hotList: []};

export function post(state = initialState, action) {
    switch (action.type) {
        case postConstants.GET_POST_LIST:
            return {
                list: action.data.data,
                totalPage: action.data.total,
                loading: false,
                curenPage: action.data.current_page
            };
        case postConstants.REQUEST_LIST:
            return {
                ...state,
                loading: true
            };
        case postConstants.GET_POST_HOT:
            return {
                ...state,
                loading: false,
                hotList: action.data
            } 
        case postConstants.REQUEST_FORM: 
            return {
                ...state,
                saving: true
            }
        case postConstants.GET_INFO_POST:
            return {
                ...state,
                info: action.data
            }
        default:
            return state
    }
}