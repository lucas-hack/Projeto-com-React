import { ùseState, createContext, useState } from "react"
import { auth, db } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    // função para logar o usuário
    async function singIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                const docRef = doc(db, "users", uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    nome: docSnap.data().firstName,
                    email: value.user.email,
                    pais: docSnap.data().country,
                    cidade: docSnap.data().city
                }

                setUser(data)
                storageUser(data)
                toast.success("Logado com sucesso!")
                navigate("/dashboard")
            })
            .catch(() => {
                
                toast.error("Parece que você não possui uma conta, crie uma para continuar")
                navigate("/register")
            })
    }

    // função para criar um novo usuário
    async function newUser(firstNameFormat, lastNameFormat, countryFormat, cityFormat, email, password) {

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await setDoc(doc(db, "users", uid), {
                    firstName: firstNameFormat,
                    lastName: lastNameFormat,
                    country: countryFormat,
                    city: cityFormat,
                })
                    .then(() => {

                        let data = {
                            uid: uid,
                            nome: firstNameFormat,
                            email: value.user.email,
                            pais: countryFormat,
                            cidade: cityFormat
                        }

                        setUser(data)
                        storageUser(data)
                        toast.success("Cadastro com sucesso")
                        navigate("/dashboard")
                    })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    function storageUser(data) {
        localStorage.setItem("#local", JSON.stringify(data))
    }

    return (
        <AuthContext.Provider
            value={{
                logado: !!user,
                user,
                singIn,
                newUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider