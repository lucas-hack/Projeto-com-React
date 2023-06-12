import "./estilo.css";
import Laptop from "../../images/computador_login.png"

function Register() {
  return (
    <div>
      <div className="container">
        <h1 className="titulo">Welcome,</h1>
        <h2 className="subTitulo">Please, register to continue</h2>

        <form className="form">
          <div className="inputGroup">
            <span>first name</span>
            <input type="text" placeholder="Your first name" />
          </div>

          <div className="inputGroup">
            <span>last name</span>
            <input type="text" placeholder="Your last name" />
          </div>

          <div className="inputGroup">
            <span>birth date</span>
            <input type="text" placeholder="MM/DD/YYYY" />
          </div>

          <div className="inputGroup">
            <span>Country</span>
            <input type="text" placeholder="Your Country" />
          </div>

          <div className="inputGroup">
            <span>City</span>
            <input type="text" placeholder="Your City" />
          </div>

          <div className="inputGroup">
            <span>e-mail</span>
            <input type="text" placeholder="A valid e-mail here" />
          </div>

          <div className="inputGroup">
            <span>password</span>
            <input type="text" placeholder="Your password" />
          </div>

          <div className="inputGroup">
            <span>password</span>
            <input type="text" placeholder="Comfirm your password" />
          </div>

        </form>

        <button className="botao">Register Now</button>
        
      </div>

      <div className="imagem">
        <img src={Laptop} alt="" />
      </div>
    </div>
  );
}

export default Register;
