import { useState, useContext } from "react"
import "./registro.css";
import Laptop from "../../images/computador_login.png"
import Logo from "../../images/compass-logo.png"

import { AuthContext } from "../../contexts/auth"

function Register() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birth, setBirth] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const { newUser } = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault()

    if (firstName !== "" && lastName !== "" && birth !== "" && country !== "" && city !== "" && email !== "" && password !== "" && confirmPass !== "") {

      const firstNameFormat = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      console.log(firstNameFormat);

      const lastNameFormat = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      console.log(lastNameFormat);

      const countryFormat = country.charAt(0).toUpperCase() + country.slice(1);
      console.log(countryFormat);

      const cityFormat = city.charAt(0).toUpperCase() + city.slice(1);
      console.log(cityFormat);

      if (password === confirmPass) {
        if (!/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)(?=.*[A-Z]).*$/.test(password)) {
          alert("A senha deve conter pelo menos um caractere especial, um número e uma letra maiúscula.");
        } else {
          const age = calculateAge(birth);
          if (age < 18) {
            alert("Você deve ter pelo menos 18 anos para se registrar.");
          } else {
            if (!isValidEmail(email)) {
              alert("O e-mail digitado não é válido. Certifique-se de digitar um endereço de e-mail válido.");
            }
          }
        }
      } else {
        alert("As senhas não coincidem.");
      }
      newUser(firstName,lastName,country,city,email,password)
    } else {
      alert("Você precisa preencher todos os campos.");
    }

  }

  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleBirthChange(e) {
    setBirth(e.target.value); // Atualiza o valor do campo de nascimento
  }

  return (
    <div className="container">
      <h1 className="tituloRegister">Welcome,</h1>
      <h2 className="subTituloRegister">Please, register to continue</h2>

      <form onSubmit={handleSubmit} className="formRegister">
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
          <input type="date" placeholder="MM/DD/YYYY" value={birth} onChange={(e) => setBirth(e.target.value)} />
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

        <button className="botaoRegister" type="submit">Register Now</button>
      </form>

      <img className="logo" src={Logo} alt="" />

      <div className="imagem">
        <img src={Laptop} alt="" />
      </div>
    </div>
  );
}

export default Register;