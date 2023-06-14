import { useState } from "react"
import "./home.css";
import Laptop from "../../images/computador_login.png"
import Logo from "../../images/compass-logo.png"
import IconU from "../../images/icons/icon-user.svg"
import IconP from "../../images/icons/icon-password.svg"

function Home() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <div className="container">
                <h1 className="titulo">Welcome,</h1>
                <h2 className="subTitulo">To continue browsing safely, log in to the network.</h2>

                <h2 className="tituloForm">Login</h2>

                <form className="form">

                    <div className="inputGroup">
                        <input type="text" placeholder="user name" value={name} onChange={(e) => setName(e.target.value)} />
                        <img src={IconU} alt="" />
                    </div>

                    <div className="inputGroup">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <img src={IconP} alt="" />
                    </div>

                    <button className="botao">Register Now</button>
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
