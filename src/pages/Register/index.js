import { useState } from "react"
import "./estilo.css";
import Laptop from "../../images/computador_login.png"
import Logo from "../../images/compass-logo.png"

function Register() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birth, setBirth] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (firstName !== "" && lastName !== "" && birth !== "" && country !== "" && city !== "" && email !== "" && password !== "" && confirmPass !== "") {
      if (password === confirmPass) {
        alert("Cadastro feito")
      }
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="titulo">Welcome,</h1>
        <h2 className="subTitulo">Please, register to continue</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <span>first name</span>
            <input type="text" placeholder="Your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>last name</span>
            <input type="text" placeholder="Your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>birth date</span>
            <input type="text" placeholder="MM/DD/YYYY" value={birth} onChange={(e) => setBirth(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>Country</span>
            <input type="text" placeholder="Your Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>City</span>
            <input type="text" placeholder="Your City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>e-mail</span>
            <input type="text" placeholder="A valid e-mail here" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>password</span>
            <input type="text" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="inputGroup">
            <span>password</span>
            <input type="text" placeholder="Comfirm your password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          </div>

          <button className="botao" type="submit">Register Now</button>
        </form>

      </div>

      <img className="logo" src={Logo} alt="" />

      <div className="imagem">
        <img src={Laptop} alt="" />
      </div>
    </div>
  );
}

export default Register;
