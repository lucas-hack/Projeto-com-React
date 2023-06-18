import { createContext, useEffect, useState } from "react"
import { auth, db, storage } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            const storageUser = localStorage.getItem('#local')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)

        }

        loadUser()
    }, [])

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

                alert("Parece que você não possui uma conta, crie uma para continuar")
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
                    password: password,
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

    async function logout() {
        await signOut(auth)
        localStorage.removeItem("#local")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                logado: !!user,
                user,
                singIn,
                newUser,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider