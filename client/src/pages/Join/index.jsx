import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isEmpty } from "lodash";

export const Join = () => {
  const { setValue } = useForm();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openValidDialog, setOpenValidDialog] = useState(false);
  const [openNotValidDialog, setOpenNotValidDialog] = useState(false);

  const handleSubmit = async () => {
    const param = { name, email, password };

    await axios.post("http://localhost:4000/auth/register", param).then(() => {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    });
  };

  const handleEmailCheck = async () => {
    if (isEmpty(email)) {
      return;
    }
    await axios
      .post("http://localhost:4000/auth/checkEmail", { email: email })
      .then((res) => {
        console.log(res);

        if (res.data.valid) {
          setOpenValidDialog(true);
        } else {
          setOpenNotValidDialog(true);
        }
      });
  };
  return (
    <JoinContainer>
      <>
        <Dialog open={openValidDialog}>
          <DialogContent>사용 가능한 아이디입니다!</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenValidDialog(false)}>확인</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openNotValidDialog}>
          <DialogContent>사용 불가능한 아이디입니다.</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNotValidDialog(false)}>확인</Button>
          </DialogActions>
        </Dialog>
        <form className="form_wrapper">
          <TextField
            id="standard-basic"
            label="name"
            value={name}
            size="small"
            onChange={(e) => {
              setValue("name", e.target.value, {
                shouldValidate: true,
              });
              setName(e.target.value);
            }}
          />
          <div className="textfield_with_button">
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
            <Button
              variant="outlined"
              style={{ height: "40px" }}
              disabled={isEmpty(email)}
              onClick={handleEmailCheck}>
              중복 확인
            </Button>
          </div>
          <TextField
            id="standard-basic"
            type="password"
            label="password"
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
              onClick={handleSubmit}>
              회원가입
            </Button>
          </div>
        </form>
      </>
    </JoinContainer>
  );
};

const JoinContainer = styled.div`
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

  .textfield_with_button {
    width: 100%;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 86px;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }
`;
