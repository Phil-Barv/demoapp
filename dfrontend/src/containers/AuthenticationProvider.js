import {createContext, useState} from "react"; 

const AuthContext = creatContext({}); 

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value = {{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

{/* This can be inported in the index.js and will surround the <App/> component to be rendered by the index.html file.
 This is a cleaner way to do things, and we can incorporate Axios to our project for backend support if we set our authentication this way.*/}