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
const cartReducer = (state=[],action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            let newItem = {
                name:action.item.name,
                qu:action.item.def_det.qu,
                pri:action.item.def_det.pri,
                quant:1

            }
            return [...state,newItem];
        case 'REMOVE_FROM_CART':
            let new_cart=state
            newcart = newcart.filter(it =>{
                return it.name!==action.item.name || it.qu!==action.item.def_det.qu
            })
            return newcart
        case 'INC_QUANT_IN_CART':
            newcart = state
            let i;
           
            for(i=0;i<newcart.length;i++){
                
                if(newcart[i].name === action.item.name &&  newcart[i].qu === action.item.def_det.qu){
                    let newitem = {
                        name:action.item.name,
                        qu:action.item.def_det.qu,
                        pri:action.item.def_det.pri,
                        quant:action.item.def_det.quant + 1

                    }
                    newcart[i]=newitem
                    
                    return newcart
                }
            }
        case 'DEC_QUANT_IN_CART':
            newcart = state
           
            let j;
            for(j=0;j<newcart.length;j++){
                
                if(newcart[j].name === action.item.name &&  newcart[j].qu === action.item.def_det.qu){
                    let newitem = {
                        name:action.item.name,
                        qu:action.item.def_det.qu,
                        pri:action.item.def_det.pri,
                        quant:action.item.def_det.quant - 1

                    }
                    newcart[j]=newitem
                
                    return newcart
                }
            }
        default:
            return state


    }
}
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

const shopReducer = (state=-1,action)=>{
    switch(action.type){
        case 'ADD_SHOP_ID':
            return action.id
        default:
            return state
    }
}

export default combineReducers({
    token: tokenReducer,
    cart:cartReducer,
    itemstate:itemstateReducer,
    shop_id:shopReducer
});