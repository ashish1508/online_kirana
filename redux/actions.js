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



export const getUserToken = () => dispatch => 

 AsyncStorage.getItem('userToken')
        .then((data) => {
            console.log("get:"+data)
            dispatch(loading(false));
            dispatch(saveToken(data))
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

//token="abc"
export const saveUserToken = (token) => dispatch =>{
    console.log('save use token'+token)
    resp = AsyncStorage.setItem('userToken', token)
        .then((data) => {
            console.log("save:"+data)
            dispatch(loading(false));
            dispatch(saveToken(token));
        })
        .catch((err) => {
            dispatch(loading(false));
            console.log("----------------")
            dispatch(error(err.message || 'ERROR'));
        })
        return resp
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