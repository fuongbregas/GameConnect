import axios from "axios";
import {LoginStart, LoginSuccess, LoginFailure} from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {

    dispatch(LoginStart());

    try {
        const response = await axios.post('/backend/login', userCredential);
        dispatch(
            LoginSuccess(response.data)      
            
        );
        console.log(response.data);
    }
    catch (err) {
        dispatch(
            LoginFailure(err)          
        );
    }
};