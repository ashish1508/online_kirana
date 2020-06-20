import AsyncStorage from '@react-native-community/async-storage';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});
export const addtocart = item => ({
    type:"ADD_TO_CART",
    item
})
export const removefromcart = item =>({
    type:"REMOVE_FROM_CART",
    item
})
export const incquantincart = item =>({
    type:"INC_QUANT_IN_CART",
    item
})
export const decquantincart = item =>({
    type:"DEC_QUANT_IN_CART",
    item
})

export const refreshitems = arr =>({
    type:"REFRESH",
    payload:arr
})

export const cart = itemdetails =>({
    type:"CART",
    payload:itemdetails
})
export const reloadcart = cart => ({
    type:"RELOAD_CART",
    payload:cart
})
export const addshopdetails = details => ({
    type:"ADD_SHOP_DETAILS",
    payload:details
})

export const clearcart = (id)=>({
    type:"CLEAR_CART",
    id
})


export const getUserToken = () => dispatch => 

 AsyncStorage.getItem('userToken')
        .then((data) => {
           // console.log("get:"+data)
            dispatch(loading(false));
            dispatch(saveToken(data))
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

//token="abc"


export const getUserCart = () => dispatch => 
    AsyncStorage.getItem('userCart')
    .then((data) => {
        data = JSON.parse(data)
        console.log("loaded cart data : ")
        console.log(data)
        dispatch(reloadcart(data))
    })
    .catch((err) => {
        dispatch(loading(false));
        dispatch(error(err.message || 'ERROR'));
    })






export const saveUserCart = (cart) => dispatch => {
    AsyncStorage.setItem('userCart', JSON.stringify(cart))
    .then((data) => {
        console.log("stored cart")
    })
    .catch((err) => {
        dispatch(error(err.message || 'ERROR'));
    })
}







export const saveUserToken = (token) => dispatch =>{
    console.log('save use token'+token)
     AsyncStorage.setItem('userToken', token)
        .then((data) => {
          //  console.log("save:"+data)
            dispatch(loading(false));
            dispatch(saveToken(token));
        })
        .catch((err) => {
            dispatch(loading(false));
           // console.log("----------------")
            dispatch(error(err.message || 'ERROR'));
        })
    }
    

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })