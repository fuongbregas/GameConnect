import styled from "styled-components";

export const Background = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

export const NewConversationWrapper = styled.form`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
    border-radius: 10px;
`

export const NoConversationText = styled.span`
    position:absolute;
    z-index: 2;
    color: rgb(224, 220, 220);
    top: 10%;
    font-size:50px;
    text-align: center;
    cursor: default;
`
export const SearchUserInput = styled.input`
    align-self: center;
    background-color: #242526;
    outline:none;
    caret-color: white;
    border-radius: 10px;
    border-bottom: 1px solid grey;
    width: 80%;
    height: 47px;
    padding: 10px;
    resize: none;
    color: white;
    font-size: 20px;
    font-weight: 100;
    overflow: hidden;
    border-style: solid;
    border-width: 1px;
`

export const NewConversationInput = styled.textarea`
    align-self: center;
    background-color: #242526;
    outline:none;
    caret-color: white;
    border-radius: 10px;
    border-bottom: 1px solid grey;
    width: 80%;
    height: 90px;
    padding: 10px;
    resize: none;
    color: white;
    font-size: 20px;
    font-weight: 100;
    margin-top: 25px;
    margin-bottom: 25px;
`
export const SendButton = styled.button`
    width: 90px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #0084ff;
    cursor: pointer;
    color: white;
    font-size: 20px;
    font-weight: 100;
`

export const SuggestionBox = styled.div`
    display: flex;
    width: 80%;
    max-height: 130px;
    overflow: auto;
    color : white;
    justify-content: left;
    font-size: 20px;
    padding-left: 10px;
    cursor: pointer;
    margin-top: 7px;

    &:hover {
        background-color: #0084ff;
        transition: 0.3s ease-in-out;
  }
`

