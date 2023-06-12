import "./estilo.css"

function Register() {
  return (
    <div className="container">

      <div>
        <h1 className="titulo">Welcome,</h1>
        <h2 className="subTitulo">Please, register to continue</h2>

        <form>
          <span>first name</span>
          <input type="text" />

          <span>last name</span>
          <input type="text" />

          <span>birth date</span>
          <input type="text" />

          <span>Country</span>
          <input type="text" />

          <span>City</span>
          <input type="text" />

          <span>e-mail</span>
          <input type="text" />

          <span>password</span>
          <input type="text" />

          <span>password</span>
          <input type="text" />

          <button>Register Now</button>

        </form>
      </div>

      <div className="foto">
      </div>

    </div>
  );
}

export default Register;
