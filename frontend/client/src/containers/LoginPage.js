import React from "react";
import Layout from "components/Layout";
import { resetRegistered, login } from "features/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  return (
    <Layout title="Auth Site | Login" content="Login page">
      <h1>Log into Your Account</h1>
      <form className="mt-5" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={onChange}
            value={password}
            required
          />
        </div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        )}
      </form>
    </Layout>
  );
};

export default LoginPage;
