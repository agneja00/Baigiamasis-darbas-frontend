import "./LoginForm.css"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Heading/Heading";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import routes from "../../constants/routes";
import Input from "../Input/Input";
import loginUser from "../../services/loginUser";

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <Heading title="Login" />
      <form className="form" onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        try {
          const res = await loginUser(data);
          onLogin(res.token);
          setError(null);
          navigate("/home-page");
        } catch (err) {
          setError("Email or password doesn‘t match");
        }
        setLoading(false);
      })}>

        {loading && (<h1>Loading...</h1>)}
        {!loading && (<>
          {error && <h2 className="error">{error}</h2>}
          <Input type="email" placeholder="Email" register={{ ...register("email") }} />
          <Input type="password" placeholder="Password" register={{ ...register("password") }} />
          <div className="buttons">
            <Button type="submit" label={loading ? "Loading..." : "Login"} />
            <Link to={routes.registerPage}><Button label="Register"></Button></Link>
          </div>
        </>)}
      </form>
    </div>
  );
}

export default LoginForm;