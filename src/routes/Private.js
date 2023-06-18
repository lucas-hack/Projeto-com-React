import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

export default function Private({ children }) {
    const { logado, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <div>
                <h1>tela de carregamento</h1>
                </div>
        )
    }

    if (!logado) {
        return <Navigate to="/" />
    }

    return children
}