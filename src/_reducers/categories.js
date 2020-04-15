import { categoriesConstants } from '../_constants/categories';

const initialState = {loading: true, parent: []};

export function categories(state = initialState, action) {
    switch (action.type) {
        case categoriesConstants.GET_CATEGORY_TREE:
            return {
                ...state,
                tree: action.categories,
                loading: false
            };
        case categoriesConstants.CATEGORY_PARENT_POST:
            let parents = action.categories;
            parents.unshift({
                id: '',
                name: 'All Category'
            });
            return {
                parent: parents,
            };
        case categoriesConstants.CATEGORY_PARENT_CATEGORY:
            return {
                parent: action.categories,
            };
        case categoriesConstants.DELETE_SUCCESS:
            return {
                ...state,
                tree: action.data,
                loading: false
            };
        default:
            return state
    }
}