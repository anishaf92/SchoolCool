import React,{useState,useContext} from "react";


export const AuthContext = React.createContext()
 const useAuth = () => {
    return useContext(AuthContext)
}
export default useAuth;

export function AuthProvider(props){
    const [authUser , setAuthUser] = useState(null)
    const [isLoggedIn , setIsLoggedIn] = useState(false)

    

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )

}