import axios from "axios";
import {LoginStart, LoginSuccess, LoginFailure} from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {

    dispatch(LoginStart());

    try {
        const response = await axios.post('/backend/auth/login', userCredential);
        dispatch(
            LoginSuccess(response.data)      
            
        );
    }
    catch (error) {
        
        dispatch(
            LoginFailure(error.response.status)          
        );
    }
};