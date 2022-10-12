import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, user, message } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password does not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please Create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            ></input>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              name="email"
              id="email"
              onChange={onChange}
            ></input>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
            ></input>
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
            ></input>
            <div className="form-group">
              <button className="btn btn-block" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
