import { LoginOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const { setValue } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const param = { email, password };
    await axios.post("http://localhost:4000/auth/login", param).then((res) => {
      const { isLogin } = res.data;

      if (isLogin) {
        navigate("/");
      }
    });
  };

  return (
    <LoginContainer>
      <form className="form_wrapper">
        <TextField
          id="standard-basic"
          label="email"
          value={email}
          size="small"
          onChange={(e) => {
            setValue("email", e.target.value, {
              shouldValidate: true,
            });
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          value={password}
          size="small"
          onChange={(e) => {
            setValue("password", e.target.value, {
              shouldValidate: true,
            });
            setPassword(e.target.value);
          }}
        />

        <div className="button_wrapper">
          <Button
            variant="contained"
            size="large"
            style={{ width: "100%", marginTop: "16px" }}
            onClick={handleLogin}>
            로그인
          </Button>
        </div>
        <div className="join_wrapper">
          <Link to="/join">회원가입</Link>
        </div>
      </form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 300px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 56px;

  .join_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  .form_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
  }
`;
