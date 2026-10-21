import {Type} from './action.type'
export const initialState ={
    basket:[]
}
export const reducer = (state,action) =>{
    switch (action.type) {
        case Type.ADD_TO_BASKET:
            return {
            ...state,
            basket:[...state,action.item]
            } 
    
        default:
            return state;
        }
}