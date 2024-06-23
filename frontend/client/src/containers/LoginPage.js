import React from "react";
import Layout from "components/Layout";
import { resetRegistered } from "features/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  return (
    <Layout title="Auth Site | Login" content="Login page">
      Login
    </Layout>
  );
};

export default LoginPage;
