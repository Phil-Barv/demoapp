import {useState, useEffect} from 'react';

function LoginPage(props){

    function login(e){
        props.setUserState(parseInt(e.target.value));
    };

    return (
        <div>
            <button onClick={login} value={2}> login as donor </button>
            <button onClick={login} value={1}> login as charity </button>
        </div>)
}

export default LoginPage;