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

        if(err.response.status === 400 || err.response.status === 404){
            console.log("Error logging in. Please try again");
        }
        else{
            console.log("This account is banned");
        }
        dispatch(
            LoginFailure(err)          
        );
    }
};