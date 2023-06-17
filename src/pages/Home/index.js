import { useState, useContext, useRef, useEffect } from "react"
import styles from "./home.css";
import Laptop from "../../images/computador_login.png"
import Logo from "../../images/compass-logo.png"
import IconU from "../../images/icons/icon-user.svg"
import IconP from "../../images/icons/icon-password.svg"
import { AuthContext } from "../../contexts/auth"

function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [imagePosition, setImagePosition] = useState('left');
    const inputRef = useRef(null);

    const { singIn } = useContext(AuthContext)

    const [mensagemErro, setMensagemErro] = useState()

    async function handleSingIn(e) {
        e.preventDefault()

        // quando o cadastro for feito buscar no banco de dados para ver se é igual ao que foi digitado pelo usuário
        if (email !== "" && password !== "") {
            await singIn(email, password)
        }
    }



    useEffect(() => {
        const handleInputFocus = () => {
            setImagePosition('-55px');
        };

        const handleInputBlur = () => {
            if (!inputRef.current.value) {
                setImagePosition('0');
            }
        };

        inputRef.current.addEventListener('focus', handleInputFocus);
        inputRef.current.addEventListener('blur', handleInputBlur);

        return () => {
        };
    }, []);


    return (
        <div>
            <div className="container">
                <h1 className="titulo">Welcome,</h1>
                <h2 className="subTitulo">To continue browsing safely, log in to the network.</h2>

                <h2 className="tituloForm">Login</h2>

                <form onSubmit={handleSingIn} className="form">

                    <div className="inputGroup">
                        <input type="text"
                            placeholder="user name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} ref={inputRef} />
                        <img src={IconU} style={{ position: 'absolute', top: 20, left: 393, marginLeft: imagePosition }} />
                    </div>


                    <div className="inputGroup erro">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <img src={IconP} style={{ position: 'absolute', top: 90, left: 393, marginLeft: imagePosition }} />
                    </div>

                    <small>Wow, invalid username or password.
                        Please, try again!</small>

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