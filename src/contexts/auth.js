import {ùseState, useEffect, createContext, useState} from "react"

export const AuthContext = createContext({})

function AuthProvider({children}){
const [user, setUser] = useState(null)

function singIn(email, password){
    console.log(email)
    console.log(password)
    alert("função login provider")
}

    return(
        <AuthContext.Provider
        value={{
            logado: !!user,
            user,
            singIn
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider