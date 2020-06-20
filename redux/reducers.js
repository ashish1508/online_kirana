import { combineReducers } from 'redux';

const tokenReducer = (state = {
    token: null,
    loading: true,
    error: null,
}, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token: action.token };
        case 'REMOVE_TOKEN':
            return { ...state, token: null};
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

data = [
    {
        name:'item1',
        details:[{qu:'5lit',pri:50,quant:0},{qu:'10lit',pri:150,in_cart:false,quant:0},{qu:'15lit',pri:250,in_cart:false,quant:0}],
        def_det:{qu:'5lit',pri:50,quant:0},
        
    },
    {
        name:'item2',
        details:[{qu:'6lit',pri:50,in_cart:false,quant:0},{qu:'10lit',pri:150,in_cart:false,quant:0},{qu:'15lit',pri:250,in_cart:false,quant:0}],
        def_det:{qu:'6lit',pri:60,quant:0},
        
    },
    {
        name:'item3',
        details:[{qu:'1lit',pri:1,in_cart:false,quant:0},{qu:'2lit',pri:2,in_cart:false,quant:0},{qu:'3lit',pri:3,in_cart:false,quant:0}],
        def_det:{qu:'1lit',pri:1,quant:0},
    },

]


const itemstateReducer = (state=data,action)=>{
    switch (action.type){
        case 'REFRESH':
            return action.payload
        default:
            return state
    }
}

const shopReducer = (state={name:"",id:-1,img:""},action)=>{
    switch(action.type){
        case 'ADD_SHOP_DETAILS':
            return action.payload
        default:
            return state
    }
}

const cartReducer = (state={
    shop_id:-1,
    items:{}
    },action) => {
    
    switch(action.type){
        case 'NEW_SHOP':
            return {...state, shop_id : action.payload}
        case 'CART':
            newstate = {...state}
            let item_name = action.payload.item.name
            item_val = action.payload.item
            newitems = {...newstate.items}
            if(item_val.total_quant===0){
                delete newitems[item_name]
            }else{
                newitems[item_name] = item_val
            }
            newstate.shop_id = action.payload.shop_id
            newstate.items = newitems
            
            return newstate
        case 'RELOAD_CART':
            return action.payload
        case 'CLEAR_CART':
            newstate = {
                shop_id:action.id,
                items:{}
            }
            return newstate
        
        default : return state
    }

}




export default combineReducers({
    token: tokenReducer,
    cart:cartReducer,
    itemstate:itemstateReducer,
    shop:shopReducer
});