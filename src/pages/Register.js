import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";
import Loading from "../components/LoadingError/Loading";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { name, email, password, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match")
    }
    if (name && email && password && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
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
          <h4 className="card-title mb-4 text-center">Register</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Name"
                type="text"
                value={name}
                name="name"
              />
            </div>
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
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary w-100">Register</button>
              <hr />
              <Link to="/">
                <p className="text-center">Already have an account ? Login</p>
              </Link>
              {loading && <Loading />}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
