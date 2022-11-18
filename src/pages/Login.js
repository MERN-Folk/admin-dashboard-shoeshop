import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import Loading from "../components/LoadingError/Loading";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Login</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                name="email"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                name="password"
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-primary w-100">Login</button>
              <hr />
              <Link to="/register">
                <p className="text-center">Don't have an account ? Register</p>
              </Link>
              {loading && <Loading />}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
