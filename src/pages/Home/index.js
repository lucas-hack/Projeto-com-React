import { useState, useContext } from "react"
import "./home.css";
import Laptop from "../../images/computador_login.png"
import Logo from "../../images/compass-logo.png"
import IconU from "../../images/icons/icon-user.svg"
import IconP from "../../images/icons/icon-password.svg"
import { AuthContext } from "../../contexts/auth"

function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { singIn } = useContext(AuthContext)

    async function handleSingIn(e) {
        e.preventDefault()

        // quando o cadastro for feito buscar no banco de dados para ver se é igual ao que foi digitado pelo usuário
        if (email !== "" && password !== "") {
            await singIn(email, password)
        }
    }

    return (
        <div>
            <div className="container">
                <h1 className="titulo">Welcome,</h1>
                <h2 className="subTitulo">To continue browsing safely, log in to the network.</h2>

                <h2 className="tituloForm">Login</h2>

                <form onSubmit={handleSingIn} className="form">

                    <div className="inputGroup">
                        <input type="text" placeholder="user name" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <img src={IconU} alt="" />
                    </div>

                    <div className="inputGroup">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <img src={IconP} alt="" />
                    </div>

                    <button type="submit" className="botao">Register Now</button>
                </form>

            </div>

            <img className="logo" src={Logo} alt="" />

            <div className="imagem">
                <img src={Laptop} alt="" />
            </div>
        </div>
    );
}

export default Home;
